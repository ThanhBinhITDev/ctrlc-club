# RBAC Guide

## 1. Tổng quan RBAC và các vai trò

### RBAC là gì?
Role-Based Access Control (RBAC) là hệ thống phân quyền dựa trên vai trò, giúp kiểm soát quyền truy cập của người dùng vào các tài nguyên trong hệ thống dựa trên vai trò (role) được gán cho họ.

### Các vai trò trong CTRL/C CLUB

#### 1. Super-Admin (Siêu quản trị viên)
- Quyền cao nhất trong hệ thống
- Có toàn quyền quản trị mọi thứ
- Có thể quản lý các Admin khác
- Không bị giới hạn bởi bất kỳ chính sách nào

#### 2. Admin (Quản trị viên)
- Quản lý người dùng, nội dung chính
- Có quyền tạo/sửa/xóa bài viết, danh mục
- Quản lý Moderator và Member
- Không được phép thay đổi cấu hình hệ thống cốt lõi

#### 3. Moderator (Điều hành viên)
- Quản lý nội dung do User tạo ra
- Duyệt/bỏ duyệt bài viết, bình luận
- Khóa/mở khóa tài khoản User
- Không có quyền thay đổi cấu hình hệ thống

#### 4. Member (Thành viên)
- Người dùng đã đăng ký tài khoản
- Có quyền tạo nội dung (bài viết, bình luận)
- Chỉ có thể sửa/xóa nội dung của chính mình
- Không có quyền quản trị

#### 5. Guest (Khách)
- Người dùng chưa đăng nhập
- Chỉ có quyền xem nội dung công khai
- Không có quyền tạo/sửa/xóa bất kỳ nội dung nào

## 2. Permission Matrix (Bảng phân quyền)

| Permission | Super-Admin | Admin | Moderator | Member | Guest |
|------------|-------------|-------|-----------|--------|-------|
| view_dashboard | ✓ | ✓ | ✗ | ✗ | ✗ |
| manage_users | ✓ | ✓ | ✗ | ✗ | ✗ |
| create_posts | ✓ | ✓ | ✓ | ✓ | ✗ |
| edit_posts | ✓ | ✓ | ✓ | Limited* | ✗ |
| delete_posts | ✓ | ✓ | ✓ | Limited* | ✗ |
| manage_categories | ✓ | ✓ | ✗ | ✗ | ✗ |
| moderate_comments | ✓ | ✓ | ✓ | ✗ | ✗ |
| view_analytics | ✓ | ✓ | ✗ | ✗ | ✗ |
| manage_roles | ✓ | ✗ | ✗ | ✗ | ✗ |
| system_config | ✓ | ✗ | ✗ | ✗ | ✗ |

*Limited: Chỉ được sửa/xóa bài viết của chính mình trong vòng 24h

## 3. Database Schema

### Bảng `roles`
```sql
CREATE TABLE roles (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Bảng `permissions`
```sql
CREATE TABLE permissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP NULL,
    updated_at TIMESTAMP NULL
);
```

### Bảng `role_has_permissions` (Pivot)
```sql
CREATE TABLE role_has_permissions (
    role_id BIGINT UNSIGNED NOT NULL,
    permission_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (role_id, permission_id),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);
```

### Bảng `model_has_roles` (Polymorphic)
```sql
CREATE TABLE model_has_roles (
    role_id BIGINT UNSIGNED NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (role_id, model_id, model_type),
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);
```

### Bảng `model_has_permissions` (Polymorphic)
```sql
CREATE TABLE model_has_permissions (
    permission_id BIGINT UNSIGNED NOT NULL,
    model_type VARCHAR(255) NOT NULL,
    model_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (permission_id, model_id, model_type),
    FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);
```

## 4. Laravel Implementation

### 4.1 Models

#### Role Model
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name', 'display_name', 'description'];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_has_permissions');
    }

    public function users()
    {
        return $this->morphedByMany(User::class, 'model', 'model_has_roles');
    }

    public function hasPermission($permission)
    {
        return $this->permissions()->where('name', $permission)->exists();
    }
}
```

#### Permission Model
```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    protected $fillable = ['name', 'display_name', 'description'];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'role_has_permissions');
    }

    public function users()
    {
        return $this->morphedByMany(User::class, 'model', 'model_has_permissions');
    }
}
```

#### User Model (Trait RBAC)
```php
<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    // ... existing code

    public function roles()
    {
        return $this->morphToMany(Role::class, 'model', 'model_has_roles');
    }

    public function permissions()
    {
        return $this->morphToMany(Permission::class, 'model', 'model_has_permissions');
    }

    public function assignRole(Role $role)
    {
        $this->roles()->syncWithoutDetaching([$role->id]);
    }

    public function removeRole(Role $role)
    {
        $this->roles()->detach($role->id);
    }

    public function hasRole($role)
    {
        if (is_string($role)) {
            return $this->roles->contains('name', $role);
        }

        return $role->intersect($this->roles)->isNotEmpty();
    }

    public function hasPermission($permission)
    {
        // Check direct permissions
        if (is_string($permission)) {
            if ($this->permissions->contains('name', $permission)) {
                return true;
            }
        }

        // Check permissions through roles
        foreach ($this->roles as $role) {
            if ($role->hasPermission($permission)) {
                return true;
            }
        }

        return false;
    }

    public function isSuperAdmin()
    {
        return $this->hasRole('Super-Admin');
    }
}
```

### 4.2 Policies

#### PostPolicy
```php
<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Post;

class PostPolicy
{
    public function viewAny(User $user)
    {
        return $user->hasPermission('view_posts');
    }

    public function create(User $user)
    {
        return $user->hasPermission('create_posts');
    }

    public function update(User $user, Post $post)
    {
        if ($user->hasPermission('edit_all_posts')) {
            return true;
        }

        if ($user->hasPermission('edit_own_posts') && $user->id === $post->user_id) {
            // Check 24h limit
            return $post->created_at->diffInHours(now()) <= 24;
        }

        return false;
    }

    public function delete(User $user, Post $post)
    {
        if ($user->hasPermission('delete_all_posts')) {
            return true;
        }

        if ($user->hasPermission('delete_own_posts') && $user->id === $post->user_id) {
            return $post->created_at->diffInHours(now()) <= 24;
        }

        return false;
    }
}
```

#### UserPolicy
```php
<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    public function manage(User $actor, User $user)
    {
        return $actor->hasPermission('manage_users');
    }

    public function assignRoles(User $actor, User $user)
    {
        return $actor->hasPermission('manage_roles') && !$user->isSuperAdmin();
    }
}
```

### 4.3 Gates

#### AuthServiceProvider
```php
<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Post::class => PostPolicy::class,
        User::class => UserPolicy::class,
    ];

    public function boot()
    {
        $this->registerPolicies();

        // Dynamic permission gates
        $permissions = [
            'view_dashboard',
            'manage_users',
            'create_posts',
            'edit_posts',
            'delete_posts',
            'manage_categories',
            'moderate_comments',
            'view_analytics',
            'manage_roles',
            'system_config',
        ];

        foreach ($permissions as $permission) {
            Gate::define($permission, function ($user) use ($permission) {
                return $user->hasPermission($permission);
            });
        }

        // Super-Admin override
        Gate::before(function ($user, $ability) {
            if ($user->isSuperAdmin()) {
                return true;
            }
        });
    }
}
```

### 4.4 Middleware

#### CheckPermission Middleware
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next, $permission)
    {
        if (! $request->user()?->hasPermission($permission)) {
            abort(403, 'Bạn không có quyền truy cập tính năng này.');
        }

        return $next($request);
    }
}
```

#### CheckRole Middleware
```php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (! $request->user()?->hasRole($roles)) {
            abort(403, 'Bạn không có vai trò cần thiết.');
        }

        return $next($request);
    }
}
```

## 5. Route Middleware Groups và Guards Config

### 5.1 Auth Config (config/auth.php)
```php
<?php

return [
    'defaults' => [
        'guard' => 'web',
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session',
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'token',
            'provider' => 'users',
            'hash' => false,
        ],

        'admin' => [
            'driver' => 'session',
            'provider' => 'admins',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],

        'admins' => [
            'driver' => 'eloquent',
            'model' => App\Models\Admin::class,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,
];
```

### 5.2 Kernel Config (app/Http/Kernel.php)
```php
<?php

namespace App\Http;

use Illuminate\Foundation\Http\Kernel as HttpKernel;

class Kernel extends HttpKernel
{
    protected $middlewareGroups = [
        'web' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'api' => [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            'throttle:api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ],

        'admin' => [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \App\Http\Middleware\CheckPermission::class . ':view_dashboard',
        ],
    ];

    protected $routeMiddleware = [
        'auth' => \App\Http\Middleware\Authenticate::class,
        'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
        'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
        'can' => \Illuminate\Auth\Middleware\Authorize::class,
        'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
        'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
        'signed' => \Illuminate\Routing\Middleware\ValidateSignature::class,
        'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
        'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
        'role' => \App\Http\Middleware\CheckRole::class,
        'permission' => \App\Http\Middleware\CheckPermission::class,
    ];
}
```

### 5.3 Route Groups
```php
<?php

use Illuminate\Support\Facades\Route;

// Public routes
Route::get('/', [PostController::class, 'index'])->name('home');
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');
    Route::put('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');
    Route::post('/comments', [CommentController::class, 'store'])->name('comments.store');
});

// Moderator routes
Route::middleware(['auth', 'role:Moderator'])->group(function () {
    Route::post('/posts/{post}/approve', [PostController::class, 'approve'])->name('posts.approve');
    Route::post('/comments/{comment}/approve', [CommentController::class, 'approve'])->name('comments.approve');
});

// Admin routes
Route::middleware(['auth', 'role:Admin,Super-Admin'])->group(function () {
    Route::resource('/categories', CategoryController::class);
    Route::post('/users/{user}/block', [UserController::class, 'block'])->name('users.block');
});

// Super-Admin only routes
Route::middleware(['auth', 'permission:system_config'])->group(function () {
    Route::resource('/admin/users', AdminUserController::class);
    Route::resource('/admin/roles', RoleController::class);
    Route::resource('/admin/permissions', PermissionController::class);
    Route::get('/admin/analytics', [AnalyticsController::class, 'index'])->name('admin.analytics');
});
```

## 6. Frontend Permission Checking (React/TypeScript)

### 6.1 Permission Types
```typescript
// types/permissions.ts
export type Permission =
  | 'view_dashboard'
  | 'manage_users'
  | 'create_posts'
  | 'edit_posts'
  | 'delete_posts'
  | 'manage_categories'
  | 'moderate_comments'
  | 'view_analytics'
  | 'manage_roles'
  | 'system_config';

export type Role =
  | 'Super-Admin'
  | 'Admin'
  | 'Moderator'
  | 'Member'
  | 'Guest';

export interface User {
  id: number;
  name: string;
  email: string;
  roles: Role[];
  permissions: Permission[];
}
```

### 6.2 Auth Context
```typescript
// context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types/permissions';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: Role) => boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const hasRole = (role: Role): boolean => {
    if (!user) return false;
    return user.roles.includes(role);
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, hasPermission, hasRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
```

### 6.3 Permission Hook
```typescript
// hooks/usePermission.ts
import { useAuth } from '../context/AuthContext';

export function usePermission(permission: Permission): boolean {
  const { hasPermission } = useAuth();
  return hasPermission(permission);
}
```

### 6.4 Protected Route Component
```typescript
// components/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requiredRole?: Role;
}

export function ProtectedRoute({ 
  children, 
  requiredPermission, 
  requiredRole 
}: ProtectedRouteProps) {
  const { user, isLoading, hasPermission, hasRole } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
}
```

### 6.5 Conditional Render Component
```typescript
// components/PermissionGuard.tsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface PermissionGuardProps {
  children: React.ReactNode;
  requiredPermission?: Permission;
  requiredRole?: Role;
  fallback?: React.ReactNode;
}

export function PermissionGuard({ 
  children, 
  requiredPermission, 
  requiredRole, 
  fallback = null 
}: PermissionGuardProps) {
  const { hasPermission, hasRole } = useAuth();

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return <>{fallback}</>;
  }

  if (requiredRole && !hasRole(requiredRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
```

### 6.6 Usage Example
```typescript
// pages/Dashboard.tsx
import React from 'react';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PermissionGuard } from '../components/PermissionGuard';
import { usePermission } from '../hooks/usePermission';

export function Dashboard() {
  const canEditPosts = usePermission('edit_posts');
  const canManageUsers = usePermission('manage_users');

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <PermissionGuard requiredPermission="view_analytics">
        <div className="analytics-section">
          <h2>Analytics</h2>
          {/* Analytics content */}
        </div>
      </PermissionGuard>

      <div className="actions">
        {canEditPosts && (
          <button>Edit Posts</button>
        )}
        
        {canManageUsers && (
          <button>Manage Users</button>
        )}
      </div>
    </div>
  );
}

// App Routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute requiredPermission="view_dashboard">
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/roles" 
        element={
          <ProtectedRoute requiredPermission="manage_roles">
            <RoleManager />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
}
```

### 6.7 API Interceptor
```typescript
// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      // Redirect to unauthorized page
      window.location.href = '/unauthorized';
    }
    return Promise.reject(error);
  }
);

export default api;
```

## 7. Seeder Data for Default Roles

### 7.1 Role Seeder
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\Permission;

class RoleSeeder extends Seeder
{
    public function run()
    {
        // Create Roles
        $superAdmin = Role::create([
            'name' => 'Super-Admin',
            'display_name' => 'Siêu quản trị viên',
            'description' => 'Có toàn quyền quản trị hệ thống'
        ]);

        $admin = Role::create([
            'name' => 'Admin',
            'display_name' => 'Quản trị viên',
            'description' => 'Quản lý người dùng và nội dung'
        ]);

        $moderator = Role::create([
            'name' => 'Moderator',
            'display_name' => 'Điều hành viên',
            'description' => 'Quản lý nội dung và bình luận'
        ]);

        $member = Role::create([
            'name' => 'Member',
            'display_name' => 'Thành viên',
            'description' => 'Người dùng đã đăng ký'
        ]);

        // Create Permissions
        $permissions = [
            ['view_dashboard', 'Xem dashboard'],
            ['manage_users', 'Quản lý người dùng'],
            ['create_posts', 'Tạo bài viết'],
            ['edit_posts', 'Sửa bài viết'],
            ['delete_posts', 'Xóa bài viết'],
            ['manage_categories', 'Quản lý danh mục'],
            ['moderate_comments', 'Quản lý bình luận'],
            ['view_analytics', 'Xem thống kê'],
            ['manage_roles', 'Quản lý vai trò'],
            ['system_config', 'Cấu hình hệ thống'],
        ];

        foreach ($permissions as $perm) {
            Permission::create([
                'name' => $perm[0],
                'display_name' => $perm[1],
            ]);
        }

        // Assign permissions to Super-Admin (all)
        $superAdmin->permissions()->sync(Permission::pluck('id'));

        // Assign permissions to Admin
        $adminPermissions = Permission::where('name', '!=', 'system_config')->pluck('id');
        $admin->permissions()->sync($adminPermissions);

        // Assign permissions to Moderator
        $moderatorPermissions = Permission::whereIn('name', [
            'view_dashboard',
            'create_posts',
            'edit_posts',
            'delete_posts',
            'moderate_comments',
        ])->pluck('id');
        $moderator->permissions()->sync($moderatorPermissions);

        // Assign permissions to Member
        $memberPermissions = Permission::whereIn('name', [
            'create_posts',
            'edit_posts',
            'delete_posts',
        ])->pluck('id');
        $member->permissions()->sync($memberPermissions);
    }
}
```

### 7.2 User Seeder
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Role;

class UserSeeder extends Seeder
{
    public function run()
    {
        // Create Super-Admin
        $superAdmin = User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@ctrlcclub.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);
        $superAdmin->assignRole(Role::where('name', 'Super-Admin')->first());

        // Create Admin
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@ctrlcclub.com',
            'password' => bcrypt('password'),
            'email_verified_at' => now(),
        ]);
        $admin->assignRole(Role::where('name', 'Admin')->first());

        // Create Moderators
        foreach (range(1, 3) as $i) {{
            $moderator = User::create([
                'name' => "Moderator {$i}",
                'email' => "moderator{$i}@ctrlcclub.com",
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);
            $moderator->assignRole(Role::where('name', 'Moderator')->first());
        }

        // Create Members
        foreach (range(1, 20) as $i) {{
            $member = User::create([
                'name' => "Member {$i}",
                'email' => "member{$i}@ctrlcclub.com",
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]);
            $member->assignRole(Role::where('name', 'Member')->first());
        }
    }
}
```

### 7.3 Database Seeder
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run()
    {
        $this->call([
            RoleSeeder::class,
            UserSeeder::class,
        ]);
    }
}
```

## 8. Real-world Examples

### 8.1 Post Creation with Permission Check
```php
<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function __construct()
    {
        // Apply middleware for all methods except index and show
        $this->middleware('permission:create_posts')->only(['create', 'store']);
        $this->middleware('permission:edit_posts')->only(['edit', 'update']);
        $this->middleware('permission:delete_posts')->only('destroy');
    }

    public function store(Request $request)
    {
        // Policy will be automatically checked via authorize method
        $this->authorize('create', Post::class);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'category_id' => 'required|exists:categories,id',
        ]);

        $post = $request->user()->posts()->create($validated);

        return redirect()->route('posts.show', $post);
    }

    public function update(Request $request, Post $post)
    {
        // Policy checks both permission and ownership
        $this->authorize('update', $post);

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'content' => 'sometimes|string',
        ]);

        $post->update($validated);

        return redirect()->route('posts.show', $post);
    }

    public function approve(Post $post)
    {
        // Custom gate check
        $this->authorize('approve', $post);

        $post->update(['status' => 'approved']);

        return back()->with('success', 'Bài viết đã được duyệt');
    }
}
```

### 8.2 Blade Template Authorization
```blade
{{-- resources/views/layouts/app.blade.php --}}
<nav>
    <ul>
        <li><a href="/">Trang chủ</a></li>
        
        @can('create_posts')
            <li><a href="/posts/create">Tạo bài viết</a></li>
        @endcan

        @can('manage_categories')
            <li><a href="/admin/categories">Quản lý danh mục</a></li>
        @endcan

        @can('view_analytics')
            <li><a href="/admin/analytics">Thống kê</a></li>
        @endcan

        @role('Super-Admin')
            <li><a href="/admin/system">Cấu hình hệ thống</a></li>
        @endrole

        @role(['Admin', 'Super-Admin', 'Moderator'])
            <li><a href="/admin/moderation">Kiểm duyệt</a></li>
        @endrole
    </ul>
</nav>
```

### 8.3 API Endpoint with Middleware
```php
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\UserController;

Route::prefix('api')->group(function () {
    // Public endpoints
    Route::get('/posts', [PostController::class, 'index']);
    Route::get('/posts/{post}', [PostController::class, 'show']);

    // Authenticated endpoints
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/posts', [PostController::class, 'store'])
            ->middleware('permission:create_posts');
        
        Route::put('/posts/{post}', [PostController::class, 'update'])
            ->middleware('permission:edit_posts');
        
        Route::delete('/posts/{post}', [PostController::class, 'destroy'])
            ->middleware('permission:delete_posts');
    });

    // Admin endpoints
    Route::middleware(['auth:sanctum', 'role:Admin,Super-Admin'])->group(function () {
        Route::apiResource('/admin/users', UserController::class)->except(['show']);
    });
});
```

### 8.4 Command Line Tool
```php
<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use App\Models\Role;

class AssignRole extends Command
{
    protected $signature = 'rbac:assign-role 
                            {email : User email} 
                            {role : Role name} 
                            {--remove : Remove role instead of assigning}';

    protected $description = 'Assign or remove role from user';

    public function handle()
    {
        $email = $this->argument('email');
        $roleName = $this->argument('role');
        $remove = $this->option('remove');

        $user = User::where('email', $email)->first();
        if (!$user) {
            $this->error('User not found');
            return 1;
        }

        $role = Role::where('name', $roleName)->first();
        if (!$role) {
            $this->error('Role not found');
            return 1;
        }

        if ($remove) {
            $user->removeRole($role);
            $this->info("Role '{$roleName}' removed from {$email}");
        } else {
            $user->assignRole($role);
            $this->info("Role '{$roleName}' assigned to {$email}");
        }

        return 0;
    }
}
```

### 8.5 Testing RBAC
```php
<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RBACTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function super_admin_can_access_all_routes()
    {
        $superAdmin = User::factory()->create();
        $superAdmin->assignRole(Role::where('name', 'Super-Admin')->first());

        $response = $this->actingAs($superAdmin)
            ->get('/admin/system');

        $response->assertStatus(200);
    }

    /** @test */
    public function member_cannot_access_admin_routes()
    {
        $member = User::factory()->create();
        $member->assignRole(Role::where('name', 'Member')->first());

        $response = $this->actingAs($member)
            ->get('/admin/system');

        $response->assertStatus(403);
    }

    /** @test */
    public function user_can_edit_own_post_within_24_hours()
    {
        $user = User::factory()->create();
        $user->assignRole(Role::where('name', 'Member')->first());

        $post = $user->posts()->create([
            'title' => 'Test Post',
            'content' => 'Test content',
        ]);

        $response = $this->actingAs($user)
            ->put("/posts/{$post->id}", [
                'title' => 'Updated Title',
            ]);

        $response->assertStatus(200);
        $this->assertEquals('Updated Title', $post->fresh()->title);
    }
}
```

---

**Last Updated:** 2026-04-26  
**Version:** 1.0