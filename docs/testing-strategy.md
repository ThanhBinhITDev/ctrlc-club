# Chiến Lược Testing - Comprehensive (>80% Coverage)

## Tầm Nhìn Testing

Mục tiêu của chiến lược testing là đảm bảo chất lượng code >80% coverage trên tất cả các tầng, từ unit tests đến e2e tests, với focus vào các luồng critical business.

---

## 1. Mục Tiêu Coverage

| Layer | Target Coverage | Công Cụ | Priority |
|-------|----------------|---------|----------|
| **Frontend Unit** | >80% lines, >75% branches | Jest + React Testing Library | High |
| **Frontend E2E** | >80% critical paths | Playwright | High |
| **Backend Unit** | >80% lines, >75% branches | PHPUnit | High |
| **Backend Feature** | >80% paths | PHPUnit | High |
| **API Contract** | 100% endpoints | Postman/Newman | Medium |
| **Load/Stress** | Critical endpoints | K6/Artillery | Low |

### Định Nghĩa Coverage

- **Lines**: Tỷ lệ dòng code được thực thi
- **Branches**: Tỷ lệ nhánh logic (if/else, switch) được test
- **Functions**: Tỷ lệ hàm được gọi
- **Statements**: Tỷ lệ câu lệnh được thực thi

---

## 2. Frontend Testing Strategy

### 2.1 Cấu Trúc Thư Mục Tests

```
frontend/
├── tests/
│   ├── unit/                    # Unit tests
│   │   ├── components/
│   │   ├── hooks/
│   │   └── utils/
│   ├── e2e/                     # E2E tests
│   │   ├── specs/
│   │   └── fixtures/
│   ├── __mocks__/               # Mock files
│   └── setupTests.ts            # Test setup
├── jest.config.ts               # Jest config
└── playwright.config.ts         # Playwright config
```

### 2.2 Unit Testing (Jest + React Testing Library)

#### Cấu Hình Jest

```typescript
// jest.config.ts
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Partial<import('@jest/types').Config.InitialOptions> = {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/app/**/*.tsx',
    '!src/components/ui/**/*',
    '!src/stores/**/*',
    '!**/node_modules/**',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};

export default createJestConfig(customJestConfig);
```

#### File Setup Tests

```typescript
// jest.setup.ts
import '@testing-library/jest-dom';
import { server } from './tests/mocks/server';

// Kích hoạt MSW
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock IntersectionObserver
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: jest.fn(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});
```

#### Ví Dụ: Test Component EventCard

```typescript
// tests/unit/components/EventCard.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { EventCard } from '@/components/features/events/EventCard';
import { useEventRegistration } from '@/hooks/useEventRegistration';

// Mock hook
jest.mock('@/hooks/useEventRegistration');

describe('EventCard Component', () => {
  const mockEvent = {
    id: '1',
    title: 'PHP Workshop',
    description: 'Learn PHP basics',
    startTime: '2024-12-01T10:00:00',
    endTime: '2024-12-01T12:00:00',
    capacity: 50,
    registrationsCount: 20,
    location: 'Room 101',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders event information correctly', () => {
    render(<EventCard event={mockEvent} />);

    expect(screen.getByText('PHP Workshop')).toBeInTheDocument();
    expect(screen.getByText('Learn PHP basics')).toBeInTheDocument();
    expect(screen.getByText('20 / 50 registered')).toBeInTheDocument();
    expect(screen.getByText('Room 101')).toBeInTheDocument();
  });

  it('shows register button when not full', () => {
    render(<EventCard event={mockEvent} />);
    const button = screen.getByRole('button', { name: /register now/i });
    expect(button).toBeEnabled();
    expect(button).not.toHaveClass('opacity-50');
  });

  it('disables button and shows full when capacity reached', () => {
    const fullEvent = { ...mockEvent, registrationsCount: 50 };
    render(<EventCard event={fullEvent} />);
    
    const button = screen.getByRole('button', { name: /event full/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('opacity-50');
  });

  it('calls register function on button click', async () => {
    const mockRegister = jest.fn();
    (useEventRegistration as jest.Mock).mockReturnValue({
      mutate: mockRegister,
      isPending: false,
    });

    render(<EventCard event={mockEvent} />);
    
    fireEvent.click(screen.getByRole('button', { name: /register now/i }));
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith(mockEvent.id);
    });
  });

  it('shows loading state when registering', () => {
    (useEventRegistration as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: true,
    });

    render(<EventCard event={mockEvent} />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/registering.../i)).toBeInTheDocument();
  });
});
```

#### Ví Dụ: Test Custom Hook

```typescript
// tests/unit/hooks/useAuth.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/contexts/AuthContext';

// Mock API
jest.mock('@/services/auth.service');

describe('useAuth Hook', () => {
  it('initializes with correct state', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await waitFor(() => {
      expect(result.current.isInitialized).toBe(true);
    });
  });

  it('logs in user successfully', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await result.current.login('test@example.com', 'password');

    expect(result.current.user).toBeTruthy();
    expect(result.current.isAuthenticated).toBe(true);
  });

  it('handles login error', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    await expect(
      result.current.login('invalid', 'wrong')
    ).rejects.toThrow('Invalid credentials');

    expect(result.current.error).toBe('Invalid credentials');
  });
});
```

### 2.3 E2E Testing (Playwright)

#### Cấu Hình Playwright

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
```

#### Ví Dụ: Test Đăng Ký Sự Kiện

```typescript
// tests/e2e/specs/event-registration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Event Registration Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL('/events');
  });

  test('user can register for available event', async ({ page }) => {
    await page.click('text=PHP Workshop');
    await expect(page).toHaveURL(/.*events\/.*$/);
    
    await page.click('button:has-text("Register Now")');
    
    await expect(page.locator('.toast-success'))
      .toContainText('Registration successful');
    
    const counter = page.locator('[data-testid="registration-count"]');
    await expect(counter).toContainText('21 / 50');
  });

  test('cannot register for full event', async ({ page }) => {
    await page.click('text=Advanced Workshop');
    
    const registerButton = page.locator('button:has-text("Event Full")');
    await expect(registerButton).toBeDisabled();
    await expect(registerButton).toContainText('No spots left');
  });

  test('receives confirmation email after registration', async ({ page }) => {
    await page.click('text=PHP Workshop');
    await page.click('button:has-text("Register Now")');
    
    // Check email via test inbox
    const email = page.locator('text=Confirm your registration');
    await expect(email).toBeVisible({ timeout: 10000 });
  });
});
```

#### Ví Dụ: Test Diễn Đàn

```typescript
// tests/e2e/specs/forum.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Forum Features', () => {
  test('user can create new post', async ({ page }) => {
    await page.goto('/forum');
    await page.click('button:has-text("New Post")');
    
    await page.fill('input[name="title"]', 'Test Discussion');
    await page.fill('[role="textbox"]', 'This is a test post content.');
    await page.click('button:has-text("Publish")');
    
    await expect(page.locator('.post-card')).toContainText('Test Discussion');
  });

  test('real-time comment appears', async ({ page }) => {
    const [user1, user2] = await Promise.all([
      page.context().newPage(),
      page.context().newPage(),
    ]);

    await user1.goto('/forum/posts/1');
    await user2.goto('/forum/posts/1');

    await user1.fill('[role="textbox"]', 'New comment');
    await user1.click('button:has-text("Post")');

    await expect(user2.locator('.comment')).toContainText(
      'New comment',
      { timeout: 5000 }
    );
  });
});
```

### 2.4 Test Data Management

#### Fixtures

```typescript
// tests/fixtures/user.ts
import { User } from '@/types';

export const mockUser: User = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: 'member',
  emailVerified: true,
};

export const mockEvent = {
  id: '1',
  title: 'Test Event',
  description: 'Test description',
  startTime: '2024-12-01T10:00:00',
  endTime: '2024-12-01T12:00:00',
  capacity: 50,
  registrationsCount: 0,
};
```

#### MSW Handlers

```typescript
// tests/mocks/handlers.ts
import { rest } from 'msw';

export const handlers = [
  rest.get('/api/v1/events', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [mockEvent],
        pagination: { page: 1, limit: 10, total: 1, pages: 1 },
      })
    );
  }),
];
```

---

## 3. Backend Testing Strategy

### 3.1 Cấu Trúc Thư Mục Tests

```
backend/
├── tests/
│   ├── Feature/                  # Feature tests
│   │   ├── AuthTest.php
│   │   ├── EventTest.php
│   │   ├── ForumTest.php
│   │   └── RegistrationTest.php
│   ├── Unit/                     # Unit tests
│   │   ├── EventServiceTest.php
│   │   ├── ForumServiceTest.php
│   │   └── AuthServiceTest.php
│   ├── TestCase.php              # Test base class
│   └── CreatesApplication.php    # App creator
├── phpunit.xml                   # PHPUnit config
└── bootstrap/                    # Coverage reports
```

### 3.2 PHPUnit Configuration

```xml
<!-- phpunit.xml -->
<?xml version="1.0" encoding="UTF-8"?>
<phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="./vendor/phpunit/phpunit/phpunit.xsd"
         bootstrap="vendor/autoload.php"
         colors="true"
         strict_coverage="true"
         min="80">
    <testsuites>
        <testsuite name="Feature">
            <directory suffix="Test.php">./tests/Feature</directory>
        </testsuite>
        <testsuite name="Unit">
            <directory suffix="Test.php">./tests/Unit</directory>
        </testsuite>
    </testsuites>
    <coverage processUncoveredFiles="true">
        <include>
            <directory suffix=".php">./app</directory>
        </include>
        <exclude>
            <directory suffix=".php">./app/Providers</directory>
        </exclude>
        <report>
            <clover outputFile="bootstrap/clover.xml"/>
            <html outputDirectory="bootstrap/clover-report"/>
            <text outputFile="php://stdout" showUncoveredFiles="true"/>
        </report>
    </coverage>
</phpunit>
```

### 3.3 Feature Tests

#### Ví Dụ: Event Registration Test

```php
// tests/Feature/EventTest.php
namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event as EventFacade;

class EventTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function guest_cannot_register_for_event(): void
    {
        $event = Event::factory()->create();

        $response = $this->postJson("/api/v1/events/{$event->id}/register");

        $response->assertStatus(401)
            ->assertJson([
                'error' => 'Unauthenticated',
            ]);
    }

    /** @test */
    public function authenticated_user_can_register_for_event(): void
    {
        $user = User::factory()->create();
        $event = Event::factory()->create(['capacity' => 50]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/events/{$event->id}/register");

        $response->assertStatus(201)
            ->assertJsonStructure([
                'data' => [
                    'event_id',
                    'user_id',
                    'status',
                ],
            ]);

        $this->assertDatabaseHas('event_user', [
            'user_id' => $user->id,
            'event_id' => $event->id,
            'status' => 'registered',
        ]);
    }

    /** @test */
    public function cannot_register_when_event_is_full(): void
    {
        $user = User::factory()->create();
        $event = Event::factory()->create(['capacity' => 1]);

        // Fill the event
        $event->registrations()->create([
            'user_id' => User::factory()->create()->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/events/{$event->id}/register");

        $response->assertStatus(409)
            ->assertJson([
                'error' => 'Event is full',
            ]);

        $this->assertDatabaseMissing('event_user', [
            'user_id' => $user->id,
            'event_id' => $event->id,
        ]);
    }

    /** @test */
    public function cannot_register_twice_for_same_event(): void
    {
        $user = User::factory()->create();
        $event = Event::factory()->create();

        $event->registrations()->create([
            'user_id' => $user->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/v1/events/{$event->id}/register");

        $response->assertStatus(422)
            ->assertJsonValidationErrors('user_id');
    }

    /** @test */
    public function event_list_is_paginated(): void
    {
        Event::factory()->count(25)->create();

        $response = $this->getJson('/api/v1/events?page=1&limit=10');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'data',
                'pagination' => [
                    'page',
                    'limit',
                    'total',
                    'pages',
                ],
            ])
            ->assertJsonPath('pagination.total', 25)
            ->assertJsonPath('pagination.pages', 3);
    }

    /** @test */
    public function event_search_works_with_full_text(): void
    {
        Event::factory()->create([
            'title' => 'PHP Workshop',
            'description' => 'Learn PHP programming',
        ]);
        Event::factory()->create([
            'title' => 'JavaScript Seminar',
            'description' => 'Advanced JS techniques',
        ]);

        $response = $this->getJson('/api/v1/events?search=php');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonPath('data.0.title', 'PHP Workshop');
    }
}
```

### 3.4 Unit Tests

#### Ví Dụ: EventService Test

```php
// tests/Unit/EventServiceTest.php
namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Event;
use App\Models\User;
use App\Services\EventService;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EventServiceTest extends TestCase
{
    use RefreshDatabase;

    protected EventService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = app(EventService::class);
    }

    /** @test */
    public function it_calculates_remaining_capacity(): void
    {
        $event = Event::factory()->create(['capacity' => 50]);
        $event->registrations()->createMany([
            ['user_id' => User::factory()->create()->id],
            ['user_id' => User::factory()->create()->id],
        ]);

        $remaining = $this->service->getRemainingCapacity($event->id);

        $this->assertEquals(48, $remaining);
    }

    /** @test */
    public function it_detects_full_event(): void
    {
        $event = Event::factory()->create(['capacity' => 2]);
        $event->registrations()->createMany([
            ['user_id' => User::factory()->create()->id],
            ['user_id' => User::factory()->create()->id],
        ]);

        $this->assertTrue($this->service->isFull($event->id));
    }

    /** @test */
    public function it_checks_user_registration_status(): void
    {
        $user = User::factory()->create();
        $event = Event::factory()->create();
        $event->registrations()->create(['user_id' => $user->id]);

        $this->assertTrue($this->service->isRegistered($event->id, $user->id));
        $this->assertFalse($this->service->isRegistered($event->id, 999));
    }
}
```

### 3.5 Database Factories

```php
// database/factories/EventFactory.php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,
            'description' => $this->faker->paragraph,
            'start_time' => $this->faker->dateTimeBetween('+1 week', '+1 month'),
            'end_time' => $this->faker->dateTimeBetween('+2 weeks', '+2 months'),
            'capacity' => $this->faker->numberBetween(20, 100),
            'status' => 'published',
        ];
    }
}
```

---

## 4. Coverage Targets by Module

### 4.1 Critical Paths (Must Test)

| Module | Target Coverage | Test Type | Priority |
|--------|----------------|-----------|----------|
| Authentication | 90% | Unit + Feature | Critical |
| Event Registration | 90% | E2E + Unit | Critical |
| Forum Posts | 85% | E2E + Unit | High |
| User Profiles | 80% | Unit | Medium |
| API Endpoints | 100% | Feature | Critical |

### 4.2 Coverage Exclusions

```
# Frontend (Jest)
src/app/**/*.tsx          # Route handlers
src/components/ui/**/*     # Third-party components
src/stores/**/*            # Simple state stores

# Backend (PHPUnit)
app/Providers/**/*         # Service providers
tests/**/*                 # Test files
vendor/**/*                # Dependencies
```

---

## 5. Running Tests

### 5.1 Frontend

```bash
# Run all unit tests with coverage
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm run test -- EventCard.test.tsx

# Run E2E tests
npm run e2e

# Run E2E with UI mode
npm run e2e:ui
```

### 5.2 Backend

```bash
# Run all tests with coverage
composer test

# Run only unit tests
composer test:unit

# Run only feature tests
composer test:feature

# Run specific test class
php artisan test --filter EventTest
```

### 5.3 CI/CD Pipeline

```bash
# Full test suite (CI)
npm run test
npm run e2e
composer test
```

---

## 6. Best Practices

### 6.1 Writing Good Tests

**DO:**
- Test behavior, not implementation
- Use descriptive test names
- Arrange-Act-Assert pattern
- Test edge cases (empty, null, boundaries)
- Mock external APIs

**DON'T:**
- Test private methods
- Over-mock dependencies
- Test third-party libraries
- Write tests after deadline pressure

### 6.2 Test Naming Convention

```typescript
// Good
test('should disable button when event is full', () => { ... })
test('throws error for invalid email format', () => { ... })

// Bad  
test('button test', () => { ... })
test('check email', () => { ... })
```

### 6.3 Continuous Integration

- Run tests on every PR
- Enforce 80% coverage minimum
- Block merge if tests fail
- Auto-comment coverage changes

---

## 7. Monitoring and Reporting

### 7.1 Coverage Reports

**Frontend:**
```
-----------------|---------|----------|---------|---------|-------------------
File             | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-----------------|---------|----------|---------|---------|-------------------
src/components/  |   85.5% |    82.1% |   88.3% |   86.2% | ...
src/hooks/       |   92.1% |    89.5% |   94.2% |   91.8% | ...
src/services/    |   88.7% |    85.3% |   91.0% |   89.5% | ...
-----------------|---------|----------|---------|---------|-------------------
All files        |   86.8% |    84.5% |   89.2% |   87.1% |
```

**Backend:**
```
Generating code coverage report in HTML format ... done

Summary:
  Classes: 15.15% (5/33)
  Methods: 28.45% (25/88)
  Lines:   35.71% (125/350)
```

### 7.2 Test Maintenance

- Review flaky tests weekly
- Update tests with feature changes
- Remove obsolete tests
- Keep test data realistic

---

## 8. Conclusion

Chiến lược testing comprehensive đảm bảo:

1. **Độ tin cậy**: >80% coverage phát hiện bug sớm
2. **Tự động hóa**: CI/CD chạy test tự động
3. **Tốc độ**: Unit tests nhanh, E2E tests thực tế
4. **Bảo trì**: Code dễ thay đổi, ít regression
5. **Chất lượng**: Người dùng hài lòng, ít incident

**Mục tiêu cuối cùng**: Website ổn định, sẵn sàng mở rộng, đáp ứng nhu cầu 1000+ users nội bộ CLB.