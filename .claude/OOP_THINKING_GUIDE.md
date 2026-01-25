# 객체지향 사고 가이드

> AI가 코드 생성, 코드 리뷰, 설계 제안 시 적용해야 하는 객체지향 원칙
> 절차·분기 위주 제안을 지양하고, **책임·메시지·협력** 기준으로 판단한다.

---

## 핵심 철학

### 객체지향의 본질

- 객체지향은 현실 세계를 **모방**하는 것이 아니라, 현실을 기반으로 **새로운 세계를 창조**하는 것이다.
- 시스템은 **상호작용하는 자율적인 객체들의 공동체**다.
- 클래스가 아닌 **객체**가 중심이다. 클래스들의 정적 관계보다 **메시지를 주고받는 객체들의 동적 관계**가 중요하다.

### 사고의 전환

```
❌ "어떤 클래스가 필요한가?"
✅ "어떤 객체들이 어떤 메시지를 주고받으며 협력하는가?"
```

---

## 1. 협력·책임·역할 중심 설계

### 협력 (Collaboration)

> "어떠한 객체도 섬이 아니다"

- 시스템의 기능은 **객체 간 연쇄적인 요청과 응답의 흐름**으로 구현된다.
- 아주 작은 기능조차 객체 혼자 감당하기엔 복잡하므로, 객체는 다른 객체와 협력한다.
- **협력의 품질 = 객체의 품질**

### 책임 (Responsibility)

책임은 두 가지로 구분된다:

| 유형        | 설명                                               | 예시                                              |
| ----------- | -------------------------------------------------- | ------------------------------------------------- |
| **Knowing** | 자신의 상태, 관련 객체, 계산 가능한 정보를 아는 것 | `Order`가 주문 상태, 배송지, 주문항목을 알고 있음 |
| **Doing**   | 객체 생성, 연산, 다른 객체에 작업 요청             | `Order`가 총액을 계산하고, 상태를 변경함          |

### 역할 (Role)

- 역할은 **관련성 높은 책임들의 집합**이다.
- 여러 객체가 동일한 역할을 수행할 수 있다 → **역할은 대체 가능**하다.
- 하나의 객체가 동시에 여러 역할을 수행할 수 있다.

---

## 2. 자율적인 객체

### 자율성의 조건

객체가 자율적이려면 **상태(state)와 행동(behavior)을 함께** 지녀야 한다.

```
✅ 자율적인 객체
- 내부 상태를 스스로 관리
- 외부에서는 허락된 수단(메시지)으로만 의사소통
- 다른 객체는 "무엇(what)"을 할 수 있는지 알지만, "어떻게(how)" 하는지는 모름
```

### 캡슐화 (Encapsulation)

- 객체의 **내부와 외부를 명확하게 구분**한다.
- 사적인 부분은 스스로 관리하고, 외부 간섭을 차단한다.
- **메시지**(외부 요청)와 **메서드**(처리 방법)를 분리하는 것이 핵심이다.

### God Object 회피

```
❌ 모든 것을 스스로 처리하려는 God Object → 내부 복잡도로 자멸
✅ 충분히 협력적이면서 충분히 자율적인 객체
```

---

## 3. 메시지 중심 설계

### 메시지와 메서드

| 개념       | 설명                                                 |
| ---------- | ---------------------------------------------------- |
| **메시지** | 객체 간 유일한 의사소통 수단. "무엇"을 해달라는 요청 |
| **메서드** | 수신된 메시지를 처리하는 "방법"                      |

```typescript
// 메시지: "할인 금액을 계산해줘"
interface DiscountPolicy {
  calculate(order: Order): Money;  // 메시지 정의
}

// 메서드: 각 구현체가 자율적으로 처리 방법 결정
class CouponDiscount implements DiscountPolicy {
  calculate(order: Order): Money {
    return order.total().applyRate(1 - this.rate);
  }
}

class MembershipDiscount implements DiscountPolicy {
  calculate(order: Order): Money {
    return order.total().applyRate(this.rates[this.memberLevel]);
  }
}
```

### 다형성 (Polymorphism)

- 동일한 메시지에 대해 **서로 다른 방식으로 응답**할 수 있는 능력
- 메시지를 보내는 쪽은 수신자의 구체적인 타입을 알 필요 없다

---

## 4. 행동이 타입을 결정한다

### 핵심 원칙

```
❌ 객체가 어떤 데이터를 가지고 있는가 → 타입 결정
✅ 객체가 어떤 행동을 하는가 → 타입 결정
```

- 내부 표현 방식이 달라도, **동일하게 행동**하면 **동일한 타입**에 속한다.
- **동일한 행동 → 동일한 책임 → 동일한 메시지 수신**

### 책임 주도 설계 (Responsibility-Driven Design)

1. "어떤 데이터가 필요한지"가 아닌 **"무엇을 해야 하는지"**에서 시작
2. 시스템 기능을 파악 → 더 작은 책임으로 분해 → 적합한 객체에 할당
3. 객체가 외부에 제공해야 하는 **책임을 먼저** 결정
4. 그 책임을 수행하는 데 **적합한 데이터를 나중에** 결정

---

## 5. 구조 vs 기능 설계

### 설계 원칙

- "기능"에 비해 **"구조"가 더 안정적**이다.
- 변경을 예측하지 말고, **변경을 수용할 수 있는 설계**를 하라.
- 좋은 설계는 기능 변경 시 **코드의 변경 범위가 좁다**.

### 비교

| 기능 중심 설계                       | 구조 중심 설계                     |
| ------------------------------------ | ---------------------------------- |
| What: 무엇을 할 수 있는가            | How: 어떻게 해야 하는가            |
| 절차 지향적, 프로시저 기반           | 객체지향적, 책임 기반              |
| 유스케이스 모델링                    | 도메인 모델링                      |
| 데이터가 변경되면 모든 프로시저 수정 | 책임이 캡슐화되어 변경 범위 최소화 |

---

## 6. 코드 판단 기준

### ❌ 절차·분기 위주 코드 (지양)

```typescript
// 데이터와 프로시저가 분리됨
interface OrderData {
  items: { price: number; qty: number }[];
  status: string;
}

function calculateTotal(order: OrderData): number {
  return order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function applyDiscount(order: OrderData, rate: number): number {
  return calculateTotal(order) * (1 - rate);
}

// 할인 유형 추가 시 새로운 함수 계속 추가
function applyCouponDiscount(order: OrderData, code: string): number { /*...*/ }
function applyMembershipDiscount(order: OrderData, level: string): number { /*...*/ }
```

**문제점:**

- 데이터(`OrderData`)가 변경되면 모든 프로시저 수정 필요
- 기능 추가마다 프로시저 추가 → 변경 범위 증가
- 객체가 자율성을 갖지 못함

### ✅ 책임·메시지·협력 기준 코드 (지향)

```typescript
// 도메인 객체가 자신의 책임을 가짐
class Money {
  constructor(private readonly amount: number) {}
  add(other: Money): Money { return new Money(this.amount + other.amount); }
  multiply(n: number): Money { return new Money(this.amount * n); }
  applyRate(rate: number): Money { return new Money(Math.floor(this.amount * rate)); }
}

class OrderItem {
  constructor(
    private readonly productName: string,
    private readonly price: Money,
    private readonly quantity: number
  ) {}

  subtotal(): Money {
    return this.price.multiply(this.quantity);  // 자신의 책임
  }
}

class Order {
  private items: OrderItem[] = [];
  private status: string = "pending";

  total(): Money {
    // 협력: 각 OrderItem에게 subtotal 계산 요청
    return this.items.reduce(
      (sum, item) => sum.add(item.subtotal()),
      new Money(0)
    );
  }
}

// 할인 정책: 인터페이스로 추상화
interface DiscountPolicy {
  calculate(order: Order): Money;
}

// 새로운 할인 유형은 구현체만 추가
class CouponDiscount implements DiscountPolicy {
  constructor(private readonly rate: number) {}
  calculate(order: Order): Money {
    return order.total().applyRate(1 - this.rate);
  }
}
```

**장점:**

- 각 객체가 자신의 상태와 행동을 함께 관리 (자율성)
- 할인 정책 추가 시 새 구현체만 추가 (변경 범위 최소화)
- 객체 간 협력으로 기능 구현

---

## 7. 코드 리뷰 체크리스트

### 설계 관점

- [ ] 객체가 **상태와 행동을 함께** 가지고 있는가?
- [ ] 객체의 **내부 구현이 외부로부터 숨겨져** 있는가?
- [ ] **메시지(인터페이스)와 메서드(구현)**가 분리되어 있는가?
- [ ] 기능 추가 시 **변경 범위가 최소화**되는 구조인가?
- [ ] God Object가 없는가?

### 책임 관점

- [ ] 각 객체의 **책임(Knowing/Doing)이 명확**한가?
- [ ] 책임이 **적절한 객체에 할당**되었는가?
- [ ] **데이터보다 행동(책임)을 먼저** 고려했는가?

### 협력 관점

- [ ] 객체들이 **메시지를 통해 협력**하는가?
- [ ] 객체가 다른 객체의 **내부 구현에 의존**하지 않는가?
- [ ] **다형성**을 활용하여 유연성을 확보했는가?

### 타입 관점

- [ ] 타입이 **행동(역할)을 기준**으로 정의되었는가?
- [ ] 서브타입이 슈퍼타입을 **완전히 대체**할 수 있는가? (LSP)

---

## 8. 리팩토링 가이드

### 절차적 코드를 객체지향으로 전환할 때

1. **데이터와 함께 움직이는 행동 식별**

   ```
   calculateTotal(order) → order.total()
   ```

2. **책임 할당**

   - 데이터를 가진 객체에게 그 데이터를 조작하는 책임 부여
   - "이 데이터를 가장 잘 아는 객체는 누구인가?"

3. **메시지 기반 협력 설계**

   - 객체가 직접 데이터를 꺼내 처리하지 않고, 메시지를 보내 요청

4. **인터페이스로 추상화**
   - 변경될 가능성이 있는 부분을 인터페이스로 분리
   - 구현체를 자유롭게 교체할 수 있도록

### 예시: 재고 차감

```typescript
// ❌ Before: 절차적
function deductInventory(order: OrderData, inventory: Record<string, number>) {
  order.items.forEach((item) => {
    inventory[item.name] -= item.qty;
  });
}

// ✅ After: 객체지향
class Inventory {
  private stock: Map<string, number> = new Map();

  deductForOrder(order: Order): void {
    // Order에게 items를 요청하고, 재고 차감은 자신이 수행
    order.getItems().forEach((item) => {
      const current = this.stock.get(item.productName) ?? 0;
      this.stock.set(item.productName, current - item.quantity);
    });
  }
}
```

---

## 9. 설계 산출물 연결

| 산출물          | 관점        | 역할                                 |
| --------------- | ----------- | ------------------------------------ |
| **유스케이스**  | 기능 (What) | 시스템이 뭘 해야 하는지 정리         |
| **도메인 모델** | 구조 (How)  | 어떤 개념들이 협력하는지 정리        |
| **코드**        | 구현        | 도메인 모델 기반으로 유스케이스 실현 |

유스케이스로 **기능적 요구사항을 정리**하고,
도메인 모델로 **안정적인 구조를 설계**하여,
**변경에 유연한 코드**를 만든다.

---

## 10. 핵심 요약

```
1. 객체 = 상태 + 행동 (자율적 존재)
2. 타입 = 행동으로 결정 (데이터가 아님)
3. 협력 = 메시지를 통한 요청과 응답
4. 책임 = Knowing + Doing
5. 설계 = 책임 먼저, 데이터 나중
6. 목표 = 변경 범위 최소화
```

> **"훌륭한 객체지향 설계자가 되기 위해서는, 메시지를 주고받는 객체의 관점으로 사고의 중심을 전환해야 한다."**

---

_이 가이드는 「객체지향의 사실과 오해」(조영호 저)를 기반으로 작성되었습니다._
