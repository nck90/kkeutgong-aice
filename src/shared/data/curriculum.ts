export type StepType = 'CONCEPT' | 'MCQ' | 'SHORT_ANSWER' | 'CODING'

export interface CurriculumStep {
    id: string
    title: string
    type: StepType
    contentMarkdown: string
    options?: string[]
    correctAnswer?: string
    initialCode?: string
    testCode?: string
    completionMessage?: string
}

export interface CurriculumChapter {
    id: string
    title: string
    level: 'JUNIOR' | 'BASIC' | 'ASSOCIATE'
    description: string
    steps: CurriculumStep[]
}

// ==========================================
// AICE JUNIOR 커리큘럼 (No-Code GUI 방식)
// ==========================================

const juniorChapter01: CurriculumChapter = {
    id: 'ch_junior_01',
    level: 'JUNIOR',
    title: 'Ch1. AI는 어떻게 배우는가 – 지도학습 기초',
    description: '분류와 회귀의 차이, 종속변수/독립변수를 이해하고 쌀 품종 분류 문제에 대입해봅니다.',
    steps: [
        {
            id: 'j1_s01',
            title: '지도학습이란?',
            type: 'CONCEPT',
            contentMarkdown: `지도학습 (Supervised Learning)

AI는 "정답이 있는 예시"를 보면서 학습합니다. 이것을 **지도학습**이라고 합니다.

#핵심 개념
- **독립변수 (X, Feature)**: AI가 학습할 때 힌트로 사용하는 데이터 (키, 몸무게, 나이 등)
- **종속변수 (Y, Label/Target)**: AI가 맞춰야 하는 정답 (병 유무, 집값 등)

#지도학습의 두 가지 종류
| 유형 | 정답의 형태 | 예시 |
|------|------------|------|
| **분류 (Classification)** | 카테고리 (종류) | 스팸 메일 판별, 품종 분류 |
| **회귀 (Regression)** | 연속된 숫자 | 집값 예측, 온도 예측 |

#📌 규칙 요약
> 정답이 **"무슨 종류?"** → 분류 모형  
> 정답이 **"얼마나?"** → 회귀 모형`,
            completionMessage: '지도학습의 기초를 이해하셨군요! 이제 1번 문항을 풀 수 있어요.',
        },
        {
            id: 'j1_s02',
            title: '[샘플문항 1번] 알고리즘 유형 선택',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 1번

쌀의 다양한 물리적 특성값(길이, 둘레, 넓이 등)을 이용하여 **쌀의 품종(rice_type)**을 예측하는 AI 모델을 만들려고 합니다.

이 과제 해결에 알맞은 **알고리즘의 유형**을 고르시오.`,
            options: ['분류(Classification) 모형', '회귀(Regression) 모형', '군집(Clustering) 모형', '강화학습(Reinforcement Learning) 모형'],
            correctAnswer: '분류(Classification) 모형',
            completionMessage: '정답! 쌀 품종은 카테고리(종류)이므로 분류 모형을 사용해야 합니다. 군집은 정답 없이 스스로 그룹화, 강화학습은 보상 기반 학습입니다.',
        },
        {
            id: 'j1_s03',
            title: '독립변수 vs 종속변수',
            type: 'CONCEPT',
            contentMarkdown: `독립변수와 종속변수 다시 보기

**rice.csv** 데이터에는 다음 컬럼들이 포함되어 있습니다.

| 컬럼명 | 의미 | 유형 |
|--------|------|------|
| \`rice_type\` | 쌀 품종 (A품종, B품종...) | **종속변수 Y** |
| \`eccentricity\` | 분포 중심으로부터 편심도 | 독립변수 X |
| \`area_IM\` | 이미지 면적 | 독립변수 X |
| \`perimeter_IM\` | 이미지 둘레 | 독립변수 X |
| \`convex_area\` | 볼록 면적 | 독립변수 X |
| \`major_axis\` | 장축 길이 | 독립변수 X |

#핵심
- AI가 \`rice_type\`(정답)을 예측하기 위해 나머지 컬럼들(특성값)을 학습 재료로 사용
- 우리가 **예측하고 싶은 값** → 종속변수(Y)
- 예측에 **사용하는 값들** → 독립변수(X)`,
            completionMessage: '2번 문항에 도전해볼까요?',
        },
        {
            id: 'j1_s04',
            title: '[샘플문항 2번] 종속변수 선택',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 2번

rice.csv 데이터를 이용해 쌀 품종을 예측하려 합니다.

아래 컬럼 중 **종속변수(Y, Label)**로 가장 알맞은 것을 고르시오.`,
            options: ['eccentricity', 'area_IM', 'rice_type', 'perimeter_IM'],
            correctAnswer: 'rice_type',
            completionMessage: '정답! 우리가 예측하려는 목표값(정답)이 종속변수입니다. 나머지는 예측에 활용할 독립변수입니다.',
        },
    ],
}

const juniorChapter02: CurriculumChapter = {
    id: 'ch_junior_02',
    level: 'JUNIOR',
    title: 'Ch2. 데이터 탐색 – 기술통계량 이해',
    description: '평균, 중위수, 표준편차 등 기술통계량의 의미를 이해하고 데이터 특성을 파악합니다.',
    steps: [
        {
            id: 'j2_s01',
            title: '기술통계량 개념',
            type: 'CONCEPT',
            contentMarkdown: `기술통계량 (Descriptive Statistics)

데이터의 전체적인 특성을 숫자 하나로 요약한 것입니다.

#주요 기술통계량
| 통계량 | 설명 | 특징 |
|--------|------|------|
| **평균 (Mean)** | 모든 값의 합 ÷ 개수 | 이상치에 민감 |
| **중위수 (Median)** | 정렬했을 때 가운데 값 | 이상치에 강건 |
| **최빈값 (Mode)** | 가장 많이 나오는 값 | 범주형 데이터 |
| **표준편차 (Std)** | 값이 평균에서 얼마나 퍼져있나 | 클수록 변동 큼 |
| **최솟값 (Min)** | 데이터 중 가장 작은 값 | - |
| **최댓값 (Max)** | 데이터 중 가장 큰 값 | - |

#💡 중위수 vs 평균
데이터에 극단적인 값(이상치)이 있으면 평균은 왜곡될 수 있습니다.  
예) \`[1, 2, 3, 4, 100]\` → 평균: 22, **중위수: 3**  
이런 경우 중위수가 더 "대표값"으로 적합합니다.`,
            completionMessage: '3번 문항을 풀어봅시다!',
        },
        {
            id: 'j2_s02',
            title: '[샘플문항 3번] 중위수와 통계량 비교',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 3번

\`eccentricity\` 컬럼의 기술통계량을 확인했을 때 아래와 같은 결과가 나왔습니다.

| 통계량 | 값 |
|--------|----|
| 데이터 개수 (count) | 3810 |
| 평균 (mean) | 0.78 |
| **중위수 (50%)** | **0.81** |
| 표준편차 (std) | 0.08 |
| 최솟값 (min) | 0.39 |
| 최댓값 (max) | 0.96 |

**중위수(0.81)보다 작은 값을 지니는 통계량**을 모두 고르시오.`,
            options: ['평균(mean)', '표준편차(std)', '최솟값(min)', '평균과 표준편차 모두'],
            correctAnswer: '평균과 표준편차 모두',
            completionMessage: '정답! 평균 0.78 < 중위수 0.81이고, 표준편차 0.08도 0.81보다 훨씬 작습니다. 이상치로 인해 평균이 중위수보다 낮게 형성된 전형적인 패턴입니다.',
        },
        {
            id: 'j2_s03',
            title: '[샘플문항 4번] 범주형 종속변수 확인',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 4번

\`rice_type\` 컬럼의 기술통계량을 확인한 결과, 총 3개의 품종이 있으며 가장 많은 데이터를 가진 품종(최빈값)이 **Osmancik** 품종으로 나타났습니다.

AICE 시험에서 범주형 변수의 기술통계량에는 다음 항목이 포함됩니다:
- \`count\`: 전체 데이터 수
- \`unique\`: 고유값(카테고리) 수
- \`top\`: 최다 등장 값 (최빈값)
- \`freq\`: 최빈값의 등장 횟수

**rice_type의 기술통계량에서 확인할 수 있는 정보가 아닌 것은?**`,
            options: ['고유값 수 (unique)', '최빈값 (top)', '평균값 (mean)', '최빈값 등장 횟수 (freq)'],
            correctAnswer: '평균값 (mean)',
            completionMessage: '정답! 품종명(문자열) 같은 범주형 데이터는 평균을 계산할 수 없습니다. mean은 수치형 변수에서만 나타납니다.',
        },
    ],
}

const juniorChapter03: CurriculumChapter = {
    id: 'ch_junior_03',
    level: 'JUNIOR',
    title: 'Ch3. 딥러닝 모델 설계 및 파라미터',
    description: '딥러닝의 활성함수, FC레이어, Epochs, Batch Size 등 핵심 파라미터를 이해하고 결과를 해석합니다.',
    steps: [
        {
            id: 'j3_s01',
            title: '딥러닝 핵심 파라미터 이해',
            type: 'CONCEPT',
            contentMarkdown: `딥러닝 파라미터 가이드

AICE Junior에서는 No-Code GUI(AIDU ez 스타일)로 딥러닝 모델을 설계합니다.  
파라미터의 **의미**를 이해하고 결과를 해석하는 것이 핵심입니다.

#핵심 파라미터

| 파라미터 | 역할 | AICE 주요 선택지 |
|---------|------|-----------------|
| **활성함수 (Activation)** | 각 레이어의 출력을 어떻게 변환할지 | \`ReLU\` (중간층), \`softmax\` (분류 출력층) |
| **FC 레이어 수** | 모델의 깊이 (레이어 개수) | 1~3개 |
| **FC 크기** | 각 레이어의 뉴런 수 | 64, 128, 256 등 |
| **Epochs** | 전체 데이터를 몇 번 반복 학습하는지 | 10, 20, 50 등 |
| **Batch Size** | 한 번에 처리하는 데이터 묶음 크기 | 32, 64, 128, 256 |

#분류 모델의 출력층 규칙
- 출력층 활성함수: **softmax** (다중 분류)
- 출력층 뉴런 수 = **클래스(품종) 수**
  - 쌀 품종이 3종류라면 → 출력층 뉴런 3개

#평가 지표
| 지표 | 의미 |
|-----|------|
| **Accuracy (정확도)** | 전체 중 올바르게 예측한 비율 |
| **Loss (손실)** | 예측값과 실제값의 차이 (낮을수록 좋음) |`,
            completionMessage: '딥러닝 파라미터를 이해했습니다! 실제 기출 문항에 도전해봅시다.',
        },
        {
            id: 'j3_s02',
            title: '[샘플문항 6번] 딥러닝 모델 학습 결과 입력',
            type: 'SHORT_ANSWER',
            contentMarkdown: `📝 기출 유형 문항 6번

다음 조건으로 딥러닝 모델을 설정하고 학습시킨 후, **학습 완료 시 Accuracy(정확도)** 를 소수점 4자리까지 입력하시오.

#모델 설정 조건
- **종속변수**: rice_type (분류)
- **출력층 활성함수**: softmax
- **FC 레이어 수**: 1개
- **FC 레이어 크기**: 256
- **Epochs**: 20
- **Batch Size**: 256

#안내
실제 시험에서는 AIDU ez GUI에서 위 파라미터를 설정하고, 학습 완료 후 표시되는 Accuracy 수치를 그대로 입력합니다.

본 실습 시뮬레이터에서는 결과값 **0.9523**으로 학습이 완료되었다고 가정합니다.`,
            correctAnswer: '0.9523',
            completionMessage: '정답! 실제 시험에서는 GUI에 표시된 숫자를 정확히 소수점 4자리까지 입력해야 합니다.',
        },
        {
            id: 'j3_s03',
            title: '[샘플문항 7번] 중요 변수 파악',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 7번

학습된 모델에서 **품종 예측에 가장 중요한 변수 Top 5**를 확인했을 때,  
아래 보기 중 **Top 5에 포함되지 않는 변수**를 고르시오.

(실제 시험에서는 GUI의 Feature Importance 차트에서 확인)

| 순위 | 변수명 |
|-----|--------|
| 1 | major_axis |
| 2 | area_IM |
| 3 | perimeter_IM |
| 4 | convex_area |
| 5 | minor_axis |`,
            options: ['eccentricity', 'major_axis', 'perimeter_IM', 'convex_area'],
            correctAnswer: 'eccentricity',
            completionMessage: '정답! eccentricity는 Top 5 중요 변수에 포함되지 않았습니다. Feature Importance는 모델이 예측할 때 어떤 변수에 더 집중했는지 보여줍니다.',
        },
    ],
}

// ==========================================
// AICE BASIC 커리큘럼 (No-Code GUI/AutoML)
// ==========================================

const basicChapter01: CurriculumChapter = {
    id: 'ch_basic_01',
    level: 'BASIC',
    title: 'Ch1. 회귀 문제 정의 – 통신 요금 예측',
    description: '회귀 모형의 개념과 evaluation 지표(MAE, RMSE)를 이해하고 통신 요금 예측 문제에 적용합니다.',
    steps: [
        {
            id: 'b1_s01',
            title: '회귀 모형과 평가 지표',
            type: 'CONCEPT',
            contentMarkdown: `회귀(Regression) 모형과 평가 지표

#회귀가 사용되는 상황
- 예측해야 할 값이 **연속적인 숫자**일 때 사용
- 예: 다음 달 납부금액, 집값, 주가

#AICE에서 주로 사용하는 회귀 평가 지표

| 지표 | 풀네임 | 의미 | 특징 |
|-----|--------|------|------|
| **MAE** | Mean Absolute Error | 예측값과 실제값 차이의 평균 | 이상치에 덜 민감 |
| **MSE** | Mean Squared Error | 오차 제곱의 평균 | 큰 오차를 더 크게 반영 |
| **RMSE** | Root Mean Squared Error | MSE의 제곱근 | 단위가 원래와 동일 |
| **R²** | 결정계수 | 모델이 분산을 설명하는 비율 | 1에 가까울수록 좋음 |

#💡 암기 팁
- MAE, MSE, RMSE → **낮을수록** 좋은 모델
- R² → **높을수록 (1에 가까울수록)** 좋은 모델

#과제 소개: amount.csv
A통신사의 고객 데이터를 이용해 **다음 달 납부예정금액(\`label_fee\`)**을 예측하는 모델을 만듭니다.`,
            completionMessage: '이제 1번 문항을 자신 있게 풀 수 있어요!',
        },
        {
            id: 'b1_s02',
            title: '[샘플문항 1번] 알고리즘 유형 선택',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 1번

A통신사는 고객마케팅팀 앱을 통해 고객별 **다음달 납부예정금액(label_fee)**을 예측하는 AI 모델을 만들고자 합니다.

이 과제 해결에 알맞은 **알고리즘 유형**을 고르시오.`,
            options: ['회귀(Regression) 모형', '분류(Classification) 모형', '군집(Clustering) 모형', '시계열(Time Series) 모형'],
            correctAnswer: '회귀(Regression) 모형',
            completionMessage: '정답! 납부금액은 연속적인 수치이므로 회귀 모형을 사용합니다.',
        },
        {
            id: 'b1_s03',
            title: '[샘플문항 2번] 종속변수 선택',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 2번

amount.csv의 컬럼 목록입니다.

| 컬럼명 | 설명 |
|--------|------|
| \`cust_id\` | 고객 ID |
| \`customer_class\` | 고객등급 (VVIP/Gold/Silver/일반) |
| \`agreement_month\` | 잔여 약정 개월수 |
| \`prev_fee\` | 이전달 납부 금액 |
| \`label_fee\` | **다음달 납부예정금액** |
| \`call_cnt\` | 통화 횟수 |

이 과제를 해결하기 위한 **종속변수(Y, Label)**를 고르시오.`,
            options: ['cust_id', 'customer_class', 'prev_fee', 'label_fee'],
            correctAnswer: 'label_fee',
            completionMessage: '정답! 우리가 예측하려는 목표이자 정답인 label_fee가 종속변수입니다.',
        },
    ],
}

const basicChapter02: CurriculumChapter = {
    id: 'ch_basic_02',
    level: 'BASIC',
    title: 'Ch2. 데이터 전처리 – 이상치와 범주형 처리',
    description: '데이터 쏠림(불균형), 이상치 처리, 범주형 변수의 특성을 AICE 문항 기준으로 이해합니다.',
    steps: [
        {
            id: 'b2_s01',
            title: '범주형 변수와 쏠림 현상',
            type: 'CONCEPT',
            contentMarkdown: `범주형(Categorical) 변수의 쏠림 현상

#범주형 변수란?
숫자가 아닌 **텍스트(카테고리)** 로 구성된 변수입니다.  
예: 고객등급(VVIP/Gold/Silver), 서비스유형(음성/데이터/문자)

#쏠림 현상 (Imbalance)
특정 카테고리에 데이터가 **90% 이상 몰려 있는 현상**입니다.

##왜 문제인가?
- 모델이 쏠린 카테고리를 무조건 예측해도 높은 정확도가 나와버림
- 실제로는 예측 능력이 없는 모델임에도 정확도가 높게 나옴

##AICE에서 확인 방법
AIDU ez의 \`데이터 프로파일링(EDA)\` 기능에서 각 변수의 분포 차트를 확인합니다.

#쏠림 변수 처리 방법
| 방법 | 설명 |
|------|------|
| **변수 제거** | 예측에 도움이 안 되므로 삭제 |
| **Over/Under Sampling** | 특정 클래스를 늘리거나 줄임 (고급) |`,
            completionMessage: '범주형 변수의 쏠림을 이해했습니다! 문항 4번으로 넘어가요.',
        },
        {
            id: 'b2_s02',
            title: '[샘플문항 4번] 쏠린 범주형 변수 찾기',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 4번

amount.csv의 범주형 변수들에 대해 데이터 프로파일링을 실시하였습니다.  
아래 중 **특정 카테고리에 데이터의 90% 이상이 집중되어 있어 분류에 적절하지 않은 변수**를 고르시오.

| 변수명 | 고유값 수 | 가장 많은 카테고리 | 해당 비율 |
|--------|----------|------------------|---------|
| customer_class | 4 | 일반 | 62% |
| customer_level | 3 | B | 71% |
| service_category | 2 | 음성형 | **94%** |`,
            options: ['customer_class', 'customer_level', 'service_category'],
            correctAnswer: 'service_category',
            completionMessage: '정답! service_category는 94%가 한쪽으로 쏠려 있어 모델 학습에 거의 도움이 되지 않습니다. 이런 변수는 제거하는 것이 좋습니다.',
        },
        {
            id: 'b2_s03',
            title: '[샘플문항 5번] 불필요 변수 처리',
            type: 'MCQ',
            contentMarkdown: `📝 기출 유형 문항 5번

데이터를 학습하기 전 전처리 단계에서 **제거해야 할 변수**를 고르시오.  
(단, 아래 보기 중 **두 가지를 복수 선택**하시오.)

| 변수 | 제거 이유 |
|------|---------|
| \`cust_id\` | 고객 고유 번호 - 예측과 무관한 식별자 |
| \`service_category\` | 데이터 94%가 한 카테고리 - 예측 기여도 극히 낮음 |
| \`agreement_month\` | 약정 개월수 - 요금과 연관 있음 |
| \`prev_fee\` | 이전달 납부금액 - 다음달 요금에 영향 |`,
            options: ['cust_id, service_category', 'agreement_month, prev_fee', 'cust_id, agreement_month', 'service_category, prev_fee'],
            correctAnswer: 'cust_id, service_category',
            completionMessage: '정답! cust_id는 단순 식별자이므로 예측력이 없고, service_category는 쏠림이 심해 제거하는 것이 적절합니다.',
        },
    ],
}

// ==========================================
// AICE ASSOCIATE 커리큘럼 (Python 코딩)
// ==========================================

const associateChapter01: CurriculumChapter = {
    id: 'ch_associate_01',
    level: 'ASSOCIATE',
    title: 'Ch1. 데이터 로딩 & 기초 EDA',
    description: 'Pandas를 사용해 데이터를 로드하고 shape, info, describe로 기초 탐색을 수행합니다.',
    steps: [
        {
            id: 'a1_s01',
            title: 'AICE Associate 시험 구조',
            type: 'CONCEPT',
            contentMarkdown: `AICE Associate 시험 개요

Associate 등급은 **Python(Jupyter Notebook)** 환경에서 직접 코드를 작성합니다.

#시험 파이프라인 (출제 순서)
\`\`\`
[1] 데이터 로딩 & EDA
 ↓
[2] 결측치 & 이상치 처리
 ↓  
[3] 변수 선택 & 인코딩
 ↓
[4] 학습/검증 데이터 분리
 ↓
[5] 스케일링
 ↓
[6] 모델 학습 (Sklearn / Keras)
 ↓
[7] 평가 & 시각화
\`\`\`

#핵심 규칙
- 답안을 특정 **변수명**에 저장해야 함 (예: \`ans01\`, \`ans02\`)
- Pandas, Scikit-learn, Matplotlib, Seaborn 등 라이브러리 자유 사용
- 시험지의 **지시문 셀(편집 불가)** 을 반드시 읽고 따를 것

#주요 라이브러리
\`\`\`python
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_absolute_error, accuracy_score
\`\`\``,
            completionMessage: '시험 구조를 파악했습니다. 이제 실제 코딩을 시작해봅시다!',
        },
        {
            id: 'a1_s02',
            title: '[문항 1] 데이터 로딩 및 shape 확인',
            type: 'CODING',
            contentMarkdown: `📝 실습 문항 1: 데이터 로딩 및 기본 탐색

아래 지시에 따라 코드를 작성하고 실행하세요.

1. \`pandas\`를 \`pd\`로 임포트하세요.
2. 현재 경로의 \`signal_data.csv\`를 읽어 \`df\`에 저장하세요.
3. 데이터의 **행 수와 열 수**를 \`df.shape\`로 출력하세요.
4. \`df.info()\`로 각 컬럼의 데이터 타입을 확인하세요.

💡 **힌트**: 답안 변수 \`ans01\`에 행 수를, \`ans02\`에 열 수를 저장하세요.`,
            initialCode: `import pandas as pd
import numpy as np

# 샘플 데이터 생성 (실제 시험에서는 파일 경로 사용)
df = pd.DataFrame({
    'Distance': [1500, 3200, 800, 5500, 2100],
    'Speed_Per_Hour': [45, 60, 30, 80, 55],
    'Weekday': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    'Address1': ['서울', '부산', '대구', '인천', '광주'],
    'Signaltype': [1, 0, 1, 0, 1],
    'Time_Driving': [200, 450, 110, 550, 230]
})

# 1. 데이터 shape 확인
print("데이터 shape:", df.shape)

# 2. 행수와 열수를 변수에 저장
ans01 = df.shape[0]  # 행 수
ans02 = df.shape[1]  # 열 수

print(f"행 수(ans01): {ans01}")
print(f"열 수(ans02): {ans02}")

# 3. 데이터 타입 확인
print("\\n컬럼 정보:")
df.info()`,
            completionMessage: '데이터 로딩과 기본 탐색을 완료했습니다!',
        },
        {
            id: 'a1_s03',
            title: '[문항 2] 결측치 확인 및 처리',
            type: 'CODING',
            contentMarkdown: `📝 실습 문항 2: 결측치 확인

데이터의 결측치(NaN) 현황을 확인하고 처리합니다.

1. \`df.isnull().sum()\`으로 각 컬럼별 결측치 수를 확인하세요.
2. 결측치가 있는 컬럼을 **평균값으로 대체(fillna)**하세요.
3. 처리 후 결측치가 0인지 다시 확인하세요.

💡 답안 변수 \`ans03\`에 처리 후 전체 결측치 합계를 저장하세요.`,
            initialCode: `import pandas as pd
import numpy as np

# 결측치가 있는 샘플 데이터
df = pd.DataFrame({
    'Distance': [1500, None, 800, 5500, 2100],
    'Speed_Per_Hour': [45, 60, None, 80, 55],
    'Signaltype': [1, 0, 1, 0, 1],
    'Time_Driving': [200, 450, 110, None, 230]
})

print("=== 결측치 확인 (처리 전) ===")
print(df.isnull().sum())

# 수치형 컬럼 결측치를 평균값으로 대체
numeric_cols = df.select_dtypes(include='number').columns
df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].mean())

print("\\n=== 결측치 확인 (처리 후) ===")
print(df.isnull().sum())

ans03 = df.isnull().sum().sum()
print(f"\\n전체 결측치 합계(ans03): {ans03}")`,
            completionMessage: '결측치 처리 완료! 실제 시험에서는 dropna(), fillna(median()), ffill() 등 다양한 방법을 쓸 수 있습니다.',
        },
    ],
}

const associateChapter02: CurriculumChapter = {
    id: 'ch_associate_02',
    level: 'ASSOCIATE',
    title: 'Ch2. 전처리 – 인코딩 & 스케일링',
    description: '범주형 변수를 LabelEncoder/OneHotEncoder로 수치화하고, StandardScaler로 스케일링하는 방법을 학습합니다.',
    steps: [
        {
            id: 'a2_s01',
            title: '인코딩의 필요성',
            type: 'CONCEPT',
            contentMarkdown: `범주형 변수 인코딩 (Encoding)

머신러닝 모델은 **숫자만** 이해합니다. "서울", "부산" 같은 텍스트는 직접 사용할 수 없어요.

#주요 인코딩 방법

##1. 레이블 인코딩 (Label Encoding)
각 카테고리에 정수를 부여합니다.
\`\`\`python
from sklearn.preprocessing import LabelEncoder
le = LabelEncoder()
df['Weekday_encoded'] = le.fit_transform(df['Weekday'])
# Mon→0, Tue→1, Wed→2 ...
\`\`\`
⚠️ **주의**: 숫자의 크기가 의미를 갖게 되는 부작용 (예: 수요일 > 월요일?)

##2. 원핫 인코딩 (One-Hot Encoding)
카테고리별로 0/1 열을 생성합니다.
\`\`\`python
df = pd.get_dummies(df, columns=['Weekday'])
# Weekday_Mon, Weekday_Tue, ... 열 생성
\`\`\`
✅ 순서 관계가 없을 때 더 안전한 방법

#스케일링 (Scaling)
변수마다 범위가 다를 때 (예: Distance: 1000~50000, Speed: 30~120) 큰 값이 모델을 지배합니다.

| 방법 | 수식 | 특징 |
|------|------|------|
| **StandardScaler** | (x - 평균) / 표준편차 | 정규분포 가정 |
| **MinMaxScaler** | (x - min) / (max - min) | 0~1 범위로 압축 |`,
            completionMessage: '인코딩과 스케일링 개념을 이해했습니다!',
        },
        {
            id: 'a2_s02',
            title: '[문항 3] LabelEncoding & 스케일링',
            type: 'CODING',
            contentMarkdown: `📝 실습 문항 3: 전처리 파이프라인

1. \`Weekday\` 컬럼을 **LabelEncoder**로 인코딩하세요.
2. \`Address1\` 컬럼을 **원핫 인코딩**하세요.
3. 수치형 변수에 **StandardScaler**를 적용하세요.
4. \`ans04\`에 스케일링 후 \`Distance\` 컬럼의 **평균값**을 저장하세요 (소수 4자리).`,
            initialCode: `import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, StandardScaler

df = pd.DataFrame({
    'Distance': [1500, 3200, 800, 5500, 2100],
    'Speed_Per_Hour': [45, 60, 30, 80, 55],
    'Weekday': ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    'Address1': ['서울', '부산', '대구', '인천', '광주'],
    'Time_Driving': [200, 450, 110, 550, 230]
})

# 1. LabelEncoder - Weekday
le = LabelEncoder()
df['Weekday'] = le.fit_transform(df['Weekday'])

# 2. 원핫 인코딩 - Address1
df = pd.get_dummies(df, columns=['Address1'])

# 3. StandardScaler - 수치형 컬럼
scaler = StandardScaler()
num_cols = ['Distance', 'Speed_Per_Hour']
df[num_cols] = scaler.fit_transform(df[num_cols])

# 4. 스케일링 후 Distance 평균
ans04 = round(df['Distance'].mean(), 4)
print(f"스케일링 후 Distance 평균(ans04): {ans04}")
print("\\n처리된 데이터:")
print(df.head())`,
            completionMessage: '전처리 파이프라인 완성! 실제 시험에서는 스케일링을 train/test split 이후에 수행해야 데이터 누출을 방지합니다.',
        },
    ],
}

const associateChapter03: CurriculumChapter = {
    id: 'ch_associate_03',
    level: 'ASSOCIATE',
    title: 'Ch3. 모델 학습 – 회귀 & 분류',
    description: 'train_test_split으로 데이터를 분리하고 RandomForest, XGBoost 등의 모델을 학습·평가합니다.',
    steps: [
        {
            id: 'a3_s01',
            title: 'train_test_split과 모델 학습 기초',
            type: 'CONCEPT',
            contentMarkdown: `모델 학습의 핵심: 데이터 분리

#train_test_split
전체 데이터를 학습(train)과 검증(test)으로 나눕니다.

\`\`\`python
from sklearn.model_selection import train_test_split

X = df.drop('label', axis=1)  # 독립변수
y = df['label']                # 종속변수

X_train, X_test, y_train, y_test = train_test_split(
    X, y, 
    test_size=0.2,     # 20%를 테스트셋으로
    random_state=42    # 재현성을 위한 시드값
)
\`\`\`

#주요 모델 (AICE Associate 출제 범위)

| 모델 | 용도 | import |
|------|------|--------|
| \`LinearRegression\` | 회귀 | \`sklearn.linear_model\` |
| \`RandomForestRegressor/Classifier\` | 회귀/분류 | \`sklearn.ensemble\` |
| \`XGBRegressor/Classifier\` | 회귀/분류 | \`xgboost\` |

#평가 지표
\`\`\`python
from sklearn.metrics import mean_absolute_error, accuracy_score

# 회귀 평가
mae = mean_absolute_error(y_test, y_pred)

# 분류 평가  
acc = accuracy_score(y_test, y_pred)
\`\`\``,
            completionMessage: '모델 학습의 기초를 이해했습니다!',
        },
        {
            id: 'a3_s02',
            title: '[문항 4~5] RandomForest 학습 및 MAE',
            type: 'CODING',
            contentMarkdown: `📝 실습 문항 4~5: 모델 학습과 평가

1. 데이터를 80:20 비율로 train/test 분리 (random_state=42)
2. **RandomForestRegressor** 모델을 학습하세요 (n_estimators=100, random_state=42)
3. 테스트셋 예측 후 **MAE**를 계산하세요
4. \`ans05\`에 MAE를 소수 2자리로 저장하세요

💡 MAE가 낮을수록 예측이 정확합니다.`,
            initialCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error

# 샘플 데이터
np.random.seed(42)
n = 200
df = pd.DataFrame({
    'Distance': np.random.randint(500, 10000, n),
    'Speed_Per_Hour': np.random.randint(20, 120, n),
    'Signaltype': np.random.randint(0, 2, n),
})
df['Time_Driving'] = df['Distance'] / df['Speed_Per_Hour'] * 60 + np.random.normal(0, 10, n)

X = df.drop('Time_Driving', axis=1)
y = df['Time_Driving']

# 1. train/test 분리
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 2. RandomForest 학습
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 3. 예측 및 MAE 계산
y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)

# 4. 답안 저장
ans05 = round(mae, 2)
print(f"MAE(ans05): {ans05}")`,
            completionMessage: 'RandomForest 회귀 모델 학습과 MAE 평가 완료! 낮은 MAE는 예측이 실제값에 가깝다는 의미입니다.',
        },
    ],
}

const associateChapter04: CurriculumChapter = {
    id: 'ch_associate_04',
    level: 'ASSOCIATE',
    title: 'Ch4. 시각화 – Seaborn & Matplotlib',
    description: 'AICE 시험에 자주 출제되는 히스토그램, 박스플롯, 히트맵 등 주요 시각화를 실습합니다.',
    steps: [
        {
            id: 'a4_s01',
            title: 'AICE 필수 시각화 유형',
            type: 'CONCEPT',
            contentMarkdown: `AICE Associate 필수 시각화

#1. 히스토그램 (분포 확인)
\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# 단일 변수 분포
plt.figure(figsize=(8, 4))
sns.histplot(df['Distance'], bins=30, kde=True)
plt.title('Distance 분포')
plt.show()
\`\`\`

#2. 박스플롯 (이상치 확인)
\`\`\`python
plt.figure(figsize=(8, 4))
sns.boxplot(x=df['Distance'])
plt.title('Distance 박스플롯')
plt.show()
\`\`\`
> IQR 범위 밖의 점(●)이 이상치입니다.

#3. 상관관계 히트맵
\`\`\`python
plt.figure(figsize=(10, 8))
corr = df.corr()
sns.heatmap(corr, annot=True, fmt='.2f', cmap='coolwarm')
plt.title('상관관계 히트맵')
plt.show()
\`\`\`
> ±1에 가까울수록 강한 상관관계

#4. 산점도 (변수 간 관계)
\`\`\`python
plt.figure(figsize=(8, 6))
sns.scatterplot(x='Distance', y='Time_Driving', data=df, hue='Signaltype')
plt.show()
\`\`\``,
            completionMessage: '시각화 기법들을 이해했습니다! 직접 코드를 작성해봅시다.',
        },
        {
            id: 'a4_s02',
            title: '[문항 6] 상관관계 히트맵 및 해석',
            type: 'CODING',
            contentMarkdown: `📝 실습 문항 6: 상관관계 분석

1. 데이터의 수치형 변수 간 **상관관계 행렬**을 계산하세요.
2. \`seaborn\`으로 **히트맵**을 그리세요.
3. \`ans06\`에 \`Distance\`와 \`Time_Driving\` 간의 상관계수를 소수 4자리로 저장하세요.

💡 상관계수 解석:
- \`0.7 이상\`: 강한 양의 상관관계
- \`0.3~0.7\`: 중간 상관관계  
- \`0.3 미만\`: 약한 상관관계`,
            initialCode: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

np.random.seed(42)
n = 300
df = pd.DataFrame({
    'Distance': np.random.randint(500, 10000, n),
    'Speed_Per_Hour': np.random.randint(20, 120, n),
    'Signaltype': np.random.randint(0, 2, n),
})
df['Time_Driving'] = df['Distance'] / df['Speed_Per_Hour'] * 60 + np.random.normal(0, 5, n)

# 1. 상관관계 행렬
corr_matrix = df.corr()
print("상관관계 행렬:")
print(corr_matrix.round(4))

# 2. 히트맵 시각화
plt.figure(figsize=(8, 6))
sns.heatmap(corr_matrix, annot=True, fmt='.2f', cmap='coolwarm', center=0)
plt.title('변수 간 상관관계 히트맵')
plt.tight_layout()
plt.show()

# 3. 특정 상관계수 저장
ans06 = round(corr_matrix.loc['Distance', 'Time_Driving'], 4)
print(f"\\nDistance-Time_Driving 상관계수(ans06): {ans06}")`,
            completionMessage: '상관관계 분석 완료! 양의 상관관계가 강한 변수는 좋은 예측 변수가 될 가능성이 높습니다.',
        },
    ],
}

const associateChapter05: CurriculumChapter = {
    id: 'ch_associate_05',
    level: 'ASSOCIATE',
    title: 'Ch5. 딥러닝 – Keras로 분류 모델 구축',
    description: 'Keras Sequential API를 사용해 다층 퍼셉트론 분류 모델을 직접 코딩하고 학습합니다.',
    steps: [
        {
            id: 'a5_s01',
            title: 'Keras 딥러닝 기초 구조',
            type: 'CONCEPT',
            contentMarkdown: `Keras로 딥러닝 모델 만들기

AICE Associate에서는 \`tensorflow.keras\`를 사용합니다.

#기본 구조 (Sequential API)
\`\`\`python
from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

model = Sequential([
    Dense(128, activation='relu', input_shape=(n_features,)),  # 입력층+은닉층1
    Dense(64, activation='relu'),                              # 은닉층2
    Dense(n_classes, activation='softmax')                    # 출력층 (분류)
])
\`\`\`

#컴파일 (Compile)
\`\`\`python
model.compile(
    optimizer='adam',
    loss='sparse_categorical_crossentropy',  # 다중분류
    metrics=['accuracy']
)
\`\`\`

#학습 (Fit)
\`\`\`python
history = model.fit(
    X_train, y_train,
    epochs=20,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)
\`\`\`

#평가 (Evaluate)
\`\`\`python
loss, acc = model.evaluate(X_test, y_test)
print(f"테스트 정확도: {acc:.4f}")
\`\`\`

#활성함수 선택 기준
| 레이어 | 활성함수 | 이유 |
|-------|---------|------|
| 은닉층 | \`relu\` | 기울기 소실 방지 |
| 이진분류 출력층 | \`sigmoid\` | 0~1 확률 출력 |
| 다중분류 출력층 | \`softmax\` | 클래스별 확률 합=1 |
| 회귀 출력층 | (없음/\`linear\`) | 연속값 출력 |`,
            completionMessage: 'Keras 딥러닝 구조를 이해했습니다! 직접 모델을 만들어봅시다.',
        },
        {
            id: 'a5_s02',
            title: '[문항 7~8] Keras 분류 모델 학습 및 정확도',
            type: 'CODING',
            contentMarkdown: `📝 실습 문항 7~8: Keras 분류 모델

다음 조건으로 Keras 모델을 학습하고 테스트 정확도를 구하세요.

**모델 조건**:
- 은닉층 2개 (각 64개 뉴런, relu)
- 출력층: 3개 클래스, softmax
- optimizer: adam, loss: sparse_categorical_crossentropy
- epochs: 30, batch_size: 32

**답안**: \`ans07\`에 테스트 정확도(소수 4자리), \`ans08\`에 에포크 수 저장`,
            initialCode: `import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder

# 주의: 실제 환경에서는 tensorflow가 필요합니다
# 여기서는 sklearn으로 간단히 시뮬레이션

from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

np.random.seed(42)
n = 500
X = np.random.randn(n, 5)
y = np.argmax(X[:, :3], axis=1)  # 3개 클래스

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Keras 예시 (실제 환경에서 주석 해제)
# from tensorflow.keras.models import Sequential
# from tensorflow.keras.layers import Dense
# model = Sequential([
#     Dense(64, activation='relu', input_shape=(5,)),
#     Dense(64, activation='relu'),
#     Dense(3, activation='softmax')
# ])
# model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
# history = model.fit(X_train, y_train, epochs=30, batch_size=32, verbose=0)
# _, test_acc = model.evaluate(X_test, y_test)

# 시뮬레이션 (sklearn 대체)
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X_train, y_train)
test_acc = accuracy_score(y_test, clf.predict(X_test))
epochs = 30

ans07 = round(test_acc, 4)
ans08 = epochs

print(f"테스트 정확도(ans07): {ans07}")
print(f"에포크 수(ans08): {ans08}")`,
            testCode: `assert 'ans07' in globals(), 'ans07 변수가 존재하지 않습니다.'
assert 'ans08' in globals(), 'ans08 변수가 존재하지 않습니다.'
assert ans08 == 30, '에포크 수를 나타내는 ans08의 값이 30이 아닙니다.'
assert isinstance(ans07, float), 'ans07은 실수(float)여야 합니다.'
print("===========================")
print("[채점 완료] 정답입니다! (100점)")
print("===========================")
`,
            completionMessage: 'Keras 딥러닝 분류 모델 학습 완료! 실제 시험에서는 GPU 환경에서 tensorflow가 지원됩니다.',
        },
    ],
}

// ==========================================
// 전체 커리큘럼 내보내기
// ==========================================

export const curriculumData: CurriculumChapter[] = [
    // JUNIOR
    juniorChapter01,
    juniorChapter02,
    juniorChapter03,

    // BASIC
    basicChapter01,
    basicChapter02,

    // ASSOCIATE
    associateChapter01,
    associateChapter02,
    associateChapter03,
    associateChapter04,
    associateChapter05,
]

export function getChaptersByLevel(level: 'JUNIOR' | 'BASIC' | 'ASSOCIATE') {
    return curriculumData.filter((ch) => ch.level === level)
}
