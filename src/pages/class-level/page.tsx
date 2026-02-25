import { useParams, Link } from 'react-router-dom';
import { courses } from '@/shared/data/courses';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';

export function ClassLevelPage() {
    const { level } = useParams<{ level: string }>();
    const levelCourses = courses.filter(c => c.level === level);

    const levelTitle = level ? level.charAt(0).toUpperCase() + level.slice(1) : '과정';

    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link to="/">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">{levelTitle} 자격증 과정</h1>
                    <p className="text-slate-600">학습을 시작할 교재를 선택하세요</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {levelCourses.map(course => (
                    <Card key={course.id} className="flex flex-col hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Badge variant="outline" className="mb-2 uppercase">{course.level}</Badge>
                            </div>
                            <CardTitle className="text-xl">{course.title}</CardTitle>
                            <CardDescription>{course.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            {/* Progress or other info can go here */}
                            <div className="w-full bg-slate-100 rounded-full h-2 mt-4">
                                <div className="bg-primary h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 text-right">{course.progress}% 완료</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" asChild>
                                <Link to={`/course/${course.id}`}>
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    교재 펼치기
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
