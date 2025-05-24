import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Mock data for AI reports
const mockAIReports = {
  student: {
    overallProgress: 78,
    weeklyActivity: [
      { week: 'Week 1', hours: 4.5, exercises: 12, quizzes: 3 },
      { week: 'Week 2', hours: 5.2, exercises: 15, quizzes: 4 },
      { week: 'Week 3', hours: 6.1, exercises: 18, quizzes: 5 },
      { week: 'Week 4', hours: 5.8, exercises: 16, quizzes: 4 },
    ],
    learningPatterns: [
      { subject: 'Mathematics', score: 85 },
      { subject: 'Science', score: 72 },
      { subject: 'Language Arts', score: 90 },
      { subject: 'Social Studies', score: 78 },
      { subject: 'English', score: 82 },
    ],
    strengths: [
      'Strong problem-solving skills',
      'High analytical thinking ability',
      'Consistent study habits',
    ],
    areasForImprovement: [
      'More practice needed in Science topics',
      'Note-taking skills in Social Studies can be improved',
    ],
    recommendations: [
      'Add 2 hours of extra study time for Science',
      'Use visual learning materials for Social Studies',
      'Apply success in Math and Language Arts to other subjects',
    ],
    aiInsights: [
      'Most productive study hours: 14:00-16:00',
      '85% success rate in Math problems',
      '15% increase in weekly activity',
    ],
  },
  teacher: {
    classOverview: {
      averageProgress: 75,
      topPerformingStudents: ['Ayşe Yılmaz', 'Mehmet Demir', 'Zeynep Kaya'],
      needsAttention: ['Ali Öztürk', 'Can Yıldız'],
      classStrengths: [
        'Strong problem-solving in Mathematics',
        'Active participation in group work',
        'Consistent homework submission',
      ],
      classChallenges: [
        'Science laboratory activities',
        'English speaking practice',
      ],
    },
    studentProgress: [
      {
        name: 'Ayşe Yılmaz',
        progress: 92,
        attendance: 95,
        participation: 90,
        homework: 88,
        quizzes: 95,
      },
      {
        name: 'Mehmet Demir',
        progress: 85,
        attendance: 90,
        participation: 85,
        homework: 82,
        quizzes: 88,
      },
      {
        name: 'Zeynep Kaya',
        progress: 88,
        attendance: 92,
        participation: 88,
        homework: 90,
        quizzes: 85,
      },
      {
        name: 'Ali Öztürk',
        progress: 65,
        attendance: 75,
        participation: 70,
        homework: 68,
        quizzes: 62,
      },
      {
        name: 'Can Yıldız',
        progress: 68,
        attendance: 80,
        participation: 72,
        homework: 70,
        quizzes: 65,
      },
    ],
    aiRecommendations: [
      'Create individual support program for Ali and Can',
      'Add more practical activities in Science classes',
      'Increase group activities for English speaking practice',
      'Plan integrated projects to transfer Math success to other subjects',
    ],
    learningAnalytics: {
      averageStudyTime: 5.2,
      mostActiveHours: '14:00-16:00',
      popularTopics: ['Algebra', 'Photosynthesis', 'Essay Writing'],
      challengingTopics: ['Physics Laws', 'English Grammar'],
    },
  },
};

const StudentAIReport = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
          <div className="flex items-center justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-blue-600">{mockAIReports.student.overallProgress}%</span>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-gray-200"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-blue-600"
                  strokeWidth="8"
                  strokeDasharray={`${mockAIReports.student.overallProgress * 2.51} 251`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Weekly Activity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAIReports.student.weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="hours" stroke="#3B82F6" name="Study Hours" />
                <Line type="monotone" dataKey="exercises" stroke="#10B981" name="Exercises" />
                <Line type="monotone" dataKey="quizzes" stroke="#F59E0B" name="Quizzes" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Learning Patterns</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={mockAIReports.student.learningPatterns}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Strengths</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {mockAIReports.student.strengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Areas for Improvement</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {mockAIReports.student.areasForImprovement.map((area, index) => (
                  <li key={index}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">AI Analysis Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockAIReports.student.aiInsights.map((insight, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <p className="text-blue-800">{insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TeacherAIReport = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Class Overview</h3>
          <div className="space-y-4">
            <div>
              <p className="text-gray-600">Average Progress</p>
              <p className="text-2xl font-bold text-blue-600">{mockAIReports.teacher.classOverview.averageProgress}%</p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Top Performing Students</p>
              <div className="flex flex-wrap gap-2">
                {mockAIReports.teacher.classOverview.topPerformingStudents.map((student, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    {student}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-gray-600 mb-2">Students Needing Attention</p>
              <div className="flex flex-wrap gap-2">
                {mockAIReports.teacher.classOverview.needsAttention.map((student, index) => (
                  <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                    {student}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Student Progress Analysis</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockAIReports.teacher.studentProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="progress" stroke="#3B82F6" name="Progress" />
                <Line type="monotone" dataKey="attendance" stroke="#10B981" name="Attendance" />
                <Line type="monotone" dataKey="participation" stroke="#F59E0B" name="Participation" />
                <Line type="monotone" dataKey="homework" stroke="#6366F1" name="Homework" />
                <Line type="monotone" dataKey="quizzes" stroke="#EC4899" name="Quizzes" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Class Strengths and Challenges</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Class Strengths</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {mockAIReports.teacher.classOverview.classStrengths.map((strength, index) => (
                  <li key={index}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Class Challenges</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {mockAIReports.teacher.classOverview.classChallenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">AI Recommendations</h3>
          <div className="space-y-3">
            {mockAIReports.teacher.aiRecommendations.map((recommendation, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg">
                <p className="text-blue-800">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Learning Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Average Study Time</p>
            <p className="text-xl font-semibold text-gray-800">{mockAIReports.teacher.learningAnalytics.averageStudyTime} hours</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Most Active Hours</p>
            <p className="text-xl font-semibold text-gray-800">{mockAIReports.teacher.learningAnalytics.mostActiveHours}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Popular Topics</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {mockAIReports.teacher.learningAnalytics.popularTopics.map((topic, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Challenging Topics</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {mockAIReports.teacher.learningAnalytics.challengingTopics.map((topic, index) => (
                <span key={index} className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-sm">
                  {topic}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { StudentAIReport, TeacherAIReport }; 