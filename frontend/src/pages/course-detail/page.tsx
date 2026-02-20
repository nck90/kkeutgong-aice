import { Link, useParams } from 'react-router-dom'
import {
    ChevronRight,
    CheckCircle2,
    PlayCircle,
    Star,
    Share2,
    AlertCircle
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { getCourseById } from '@/shared/data/courses'
import { cn } from '@/shared/lib/utils'

/* 
  Round 4: Course Detail - 2 Column Sticky Layout 
  Left: Content (2/3)
  Right: Sticky Info Card (1/3)
*/

export function CourseDetailPage() {
    const { courseId } = useParams()
    const course = getCourseById(courseId || '')

    if (!course) return <div className="p-10 text-center">Course not found</div>

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-20">
            {/* 
          1. Nav Breadcrumb (Top)
       */}
            <div className="bg-white border-b border-[#E5E8EB]">
                <div className="max-w-[1200px] mx-auto px-6 h-[50px] flex items-center text-[13px] text-[#8B95A1]">
                    <Link to="/home" className="hover:text-[#191F28]">홈</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <Link to="/classes" className="hover:text-[#191F28]">전체 강좌</Link>
                    <ChevronRight className="w-3 h-3 mx-2" />
                    <span className="text-[#191F28] font-medium">{course.title}</span>
                </div>
            </div>

            {/* 
          2. Two-Column Layout 
       */}
            <div className="max-w-[1200px] mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">

                {/* LEFT COLUMN: Main Content */}
                <div className="space-y-12">
                    {/* Header Info */}
                    <div className="space-y-4">
                        <span className={cn(
                            "inline-block px-2 py-1 rounded-[4px] text-[11px] font-bold uppercase tracking-wider",
                            course.level === 'associate' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
                        )}>
                            {course.level}
                        </span>
                        <h1 className="text-[32px] font-extrabold text-[#191F28] leading-tight">
                            {course.title}
                        </h1>
                        <p className="text-[16px] text-[#4E5968] leading-relaxed">
                            {course.description} 현업 데이터 사이언티스트가 알려주는 실무 노하우를 AICE 자격증 교육과 함께 배워보세요.
                        </p>

                        <div className="flex items-center gap-4 text-[13px] text-[#8B95A1] pt-2">
                            <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-[#191F28] font-bold">4.9</span>
                                <span>(128개의 수강평)</span>
                            </div>
                            <div className="w-[1px] h-3 bg-[#E5E8EB]"></div>
                            <span>수강생 {course.id.length * 452}명</span>
                        </div>
                    </div>

                    {/* Tab Menu */}
                    <div className="border-b border-[#E5E8EB] flex gap-8">
                        {['강의 소개', '커리큘럼', '강사 소개', '수강평'].map((tab, i) => (
                            <button key={tab} className={cn(
                                "py-3 text-[15px] font-bold border-b-2 transition-colors",
                                i === 1 ? "text-[#7353EA] border-[#7353EA]" : "text-[#8B95A1] border-transparent hover:text-[#191F28]"
                            )}>
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Curriculum Section */}
                    <div>
                        <h2 className="text-[20px] font-bold text-[#191F28] mb-6">커리큘럼</h2>
                        <div className="space-y-4">
                            {course.chapters.map((chapter, idx) => (
                                <div key={chapter.id} className="border border-[#E5E8EB] rounded-[12px] bg-white overflow-hidden">
                                    <div className="px-5 py-4 bg-[#F8F9FA] border-b border-[#E5E8EB] flex items-center justify-between">
                                        <h3 className="text-[15px] font-bold text-[#191F28]">Lesson {idx + 1}. {chapter.title}</h3>
                                        <span className="text-[13px] text-[#8B95A1]">{chapter.lessons.length}강</span>
                                    </div>
                                    <div className="divide-y divide-[#E5E8EB]">
                                        {chapter.lessons.map(lesson => (
                                            <div key={lesson.id} className="px-5 py-3 hover:bg-[#F8F9FA] transition-colors flex items-center justify-between group">
                                                <div className="flex items-center gap-3">
                                                    <PlayCircle className="w-4 h-4 text-[#CED4DA] group-hover:text-[#7353EA]" />
                                                    <span className="text-[14px] text-[#4E5968] group-hover:text-[#191F28] transition-colors">{lesson.title}</span>
                                                </div>
                                                <span className="text-[12px] text-[#8B95A1] bg-[#F1F3F5] px-2 py-0.5 rounded">15:00</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instructor */}
                    <div className="bg-[#F8F9FA] p-8 rounded-[16px]">
                        <h2 className="text-[18px] font-bold text-[#191F28] mb-4">강사 소개</h2>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-[#E5E8EB]"></div>
                            <div>
                                <div className="font-bold text-[#191F28]">김엘리스</div>
                                <div className="text-sm text-[#8B95A1]">Senior Data Scientist @ Tech Corp</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Sticky Sidebar */}
                <div className="relative">
                    <div className="sticky top-[80px] space-y-4">
                        <div className="bg-white border border-[#E5E8EB] rounded-[16px] p-6 shadow-sm">
                            {/* Thumbnail in Card */}
                            <div className="aspect-video bg-[#F1F3F5] rounded-[8px] mb-6 flex items-center justify-center">
                                <PlayCircle className="w-10 h-10 text-[#CED4DA]" />
                            </div>

                            <div className="mb-6">
                                <div className="text-[24px] font-extrabold text-[#191F28]">무료</div>
                                <div className="text-[14px] text-[#8B95A1] line-through">50,000원</div>
                            </div>

                            <Link to={`/course/${course.id}/${course.chapters[0].lessons[0].id}`}>
                                <Button className="w-full h-[52px] bg-[#7353EA] hover:bg-[#5F3DC4] text-white font-bold text-[16px] rounded-[8px] mb-3">
                                    수강 신청하기
                                </Button>
                            </Link>

                            <Button variant="outline" className="w-full h-[44px] border-[#E5E8EB] text-[#191F28] hover:bg-[#F8F9FA] font-bold rounded-[8px] flex items-center justify-center gap-2">
                                <Share2 className="w-4 h-4" /> 공유하기
                            </Button>

                            <ul className="mt-6 space-y-3 text-[14px] text-[#4E5968]">
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7353EA]" /> 무제한 수강 가능</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7353EA]" /> 수료증 발급</li>
                                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#7353EA]" /> 모바일/PC 지원</li>
                            </ul>
                        </div>

                        <div className="bg-[#FFF3F3] p-4 rounded-[12px] flex gap-3 text-red-600">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <div className="text-[13px] font-medium leading-snug">
                                수강 신청 마감까지 <strong>3일</strong> 남았습니다.<br />
                                지금 바로 시작하세요!
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
