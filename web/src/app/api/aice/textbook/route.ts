import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/prisma'

export async function GET() {
    const user = await getCurrentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const concepts = [
        {
            id: 'tx_1',
            title: '1. Pandas 기초와 결측치 처리',
            category: 'Data Preprocessing',
            content: `
# Pandas DataFrame 기초
AICE 시험에서는 데이터를 로드하고 결측치를 처리하는 것이 필수 첫 단계입니다.

\`\`\`python
import pandas as pd

# 데이터 로드
df = pd.read_csv('data.csv')

# 결측치 확인
print(df.isnull().sum())

# 결측치 채우기 (평균값)
df['Age'] = df['Age'].fillna(df['Age'].mean())
\`\`\`
      `
        },
        {
            id: 'tx_2',
            title: '2. Scikit-Learn을 이용한 모델 학습',
            category: 'Machine Learning',
            content: `
# Random Forest Classifier
시험에 자주 등장하는 랜덤 포레스트 분류기 구조입니다.

\`\`\`python
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

preds = model.predict(X_test)
print('Accuracy:', accuracy_score(y_test, preds))
\`\`\`
      `
        }
    ]

    return NextResponse.json({
        data: concepts,
        meta: { requestId: `req_${Date.now()}` }
    })
}
