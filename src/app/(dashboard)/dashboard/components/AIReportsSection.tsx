import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { StudentAIReport, TeacherAIReport } from './AIReports';

interface AIReportsSectionProps {
  userRole: 'student' | 'teacher';
}

export const AIReportsSection = ({ userRole }: AIReportsSectionProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">AI Progress Reports</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString()}</span>
          <button className="text-blue-600 hover:text-blue-700">
            <ArrowPathIcon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {userRole === 'teacher' ? <TeacherAIReport /> : <StudentAIReport />}
    </div>
  );
}; 