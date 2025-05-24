export interface SharedStudent {
  id: number;
  name: string;
  grade: string;
  overallProgress: number;
  averageGrade: number;
  attendance: number;
  status: 'active' | 'inactive';
  strengths: string[];
  areasForImprovement: string[];
  learningStyle: string;
  recentActivity: { date: string; activity: string; duration: number }[];
  recommendations: { type: string; title: string; description: string; priority: 'high' | 'medium' | 'low' }[];
  enrolledCourses: {
    id: number;
    title: string;
    progress: number;
    lastActive: string;
    grade: string;
    needsAttention?: boolean;
    recommendations?: string[];
  }[];
  needsAttention?: boolean;
  generalRecommendations?: string[];
}

export const students: SharedStudent[] = [
  // High performer
  {
    id: 1,
    name: 'Aslan Demir',
    grade: 'Grade 4',
    overallProgress: 96,
    averageGrade: 98,
    attendance: 100,
    status: 'active',
    strengths: ['Problem Solving', 'Critical Thinking', 'Leadership'],
    areasForImprovement: ['Public Speaking'],
    learningStyle: 'Logical/Mathematical',
    recentActivity: [
      { date: '2024-05-20', activity: 'Completed Algebra Quiz', duration: 45 },
      { date: '2024-05-19', activity: 'Attended Math Olympiad', duration: 120 },
    ],
    recommendations: [
      { type: 'AI', title: 'Join a Speaking Club', description: 'Practice public speaking in a supportive environment', priority: 'medium' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 99, lastActive: '1 hour ago', grade: 'A+' },
      { id: 2, title: 'Introduction to Science for Kids', progress: 97, lastActive: '2 hours ago', grade: 'A' },
    ],
    generalRecommendations: ['Consider advanced learning materials', 'Explore enrichment opportunities'],
  },
  // Good performer
  {
    id: 2,
    name: 'Melis Polat',
    grade: 'Grade 3',
    overallProgress: 89,
    averageGrade: 91,
    attendance: 98,
    status: 'active',
    strengths: ['Creativity', 'Collaboration', 'Active Participation'],
    areasForImprovement: ['Time Management'],
    learningStyle: 'Visual and Kinesthetic',
    recentActivity: [
      { date: '2024-05-18', activity: 'Participated in Debate', duration: 60 },
      { date: '2024-05-17', activity: 'Completed Science Project', duration: 90 },
    ],
    recommendations: [
      { type: 'AI', title: 'Practice Time Management', description: 'Use a planner to organize study sessions', priority: 'medium' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 90, lastActive: '3 hours ago', grade: 'A' },
      { id: 2, title: 'Introduction to Science for Kids', progress: 88, lastActive: '1 hour ago', grade: 'A-' },
    ],
    generalRecommendations: ['Encourage leadership in group projects'],
  },
  // Good performer
  {
    id: 3,
    name: 'Selin Arslan',
    grade: 'Grade 4',
    overallProgress: 85,
    averageGrade: 87,
    attendance: 97,
    status: 'active',
    strengths: ['Persistence', 'Attention to Detail'],
    areasForImprovement: ['Group Work'],
    learningStyle: 'Reading/Writing',
    recentActivity: [
      { date: '2024-05-16', activity: 'Submitted Essay', duration: 120 },
      { date: '2024-05-15', activity: 'Read History Chapter', duration: 40 },
    ],
    recommendations: [
      { type: 'AI', title: 'Participate in Group Projects', description: 'Engage more in collaborative assignments', priority: 'low' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 87, lastActive: '2 days ago', grade: 'A-' },
      { id: 2, title: 'Introduction to Science for Kids', progress: 85, lastActive: '1 day ago', grade: 'B+' },
    ],
    generalRecommendations: ['Practice teamwork in class activities'],
  },
  // Mid performer
  {
    id: 4,
    name: 'Kenan Yaman',
    grade: 'Grade 3',
    overallProgress: 74,
    averageGrade: 76,
    attendance: 92,
    status: 'active',
    strengths: ['Organization', 'Self-Motivation'],
    areasForImprovement: ['Math Skills'],
    learningStyle: 'Interpersonal',
    recentActivity: [
      { date: '2024-05-14', activity: 'Solved Math Problems', duration: 50 },
      { date: '2024-05-13', activity: 'Attended Workshop', duration: 70 },
    ],
    recommendations: [
      { type: 'AI', title: 'Practice Math Daily', description: 'Spend 15 minutes daily on math exercises', priority: 'high' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 70, lastActive: '3 days ago', grade: 'C+' },
      { id: 2, title: 'Introduction to Science for Kids', progress: 80, lastActive: '2 days ago', grade: 'B' },
    ],
    needsAttention: true,
    generalRecommendations: ['Provide extra math support'],
  },
  // Mid performer
  {
    id: 5,
    name: 'Sibel Aydin',
    grade: 'Grade 4',
    overallProgress: 68,
    averageGrade: 70,
    attendance: 90,
    status: 'active',
    strengths: ['Teamwork', 'Empathy'],
    areasForImprovement: ['Writing Skills'],
    learningStyle: 'Auditory',
    recentActivity: [
      { date: '2024-05-12', activity: 'Group Discussion', duration: 35 },
      { date: '2024-05-11', activity: 'Peer Review', duration: 25 },
    ],
    recommendations: [
      { type: 'AI', title: 'Write Short Stories', description: 'Practice creative writing weekly', priority: 'medium' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 65, lastActive: '4 days ago', grade: 'C' },
      { id: 2, title: 'Introduction to Science for Kids', progress: 75, lastActive: '3 days ago', grade: 'B-' },
    ],
    needsAttention: true,
    generalRecommendations: ['Encourage daily writing practice'],
  },
  // Mid performer
  {
    id: 6,
    name: 'Deniz Korkmaz',
    grade: 'Grade 3',
    overallProgress: 62,
    averageGrade: 65,
    attendance: 85,
    status: 'active',
    strengths: ['Curiosity', 'Participation'],
    areasForImprovement: ['Reading Comprehension'],
    learningStyle: 'Reading/Writing',
    recentActivity: [
      { date: '2024-05-10', activity: 'Read Science Article', duration: 30 },
      { date: '2024-05-09', activity: 'Completed Reading Assignment', duration: 40 },
    ],
    recommendations: [
      { type: 'AI', title: 'Practice Reading', description: 'Read a new article every day', priority: 'medium' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 60, lastActive: '5 days ago', grade: 'D+' },
      { id: 2, title: 'Introduction to Science for Kids', progress: 70, lastActive: '4 days ago', grade: 'C' },
    ],
    needsAttention: true,
    generalRecommendations: ['Assign reading partners'],
  },
  // Low performer
  {
    id: 7,
    name: 'Efe Baran',
    grade: 'Grade 4',
    overallProgress: 54,
    averageGrade: 58,
    attendance: 80,
    status: 'active',
    strengths: ['Creativity'],
    areasForImprovement: ['Math Skills', 'Time Management'],
    learningStyle: 'Visual and Kinesthetic',
    recentActivity: [
      { date: '2024-05-08', activity: 'Missed Math Homework', duration: 0 },
      { date: '2024-05-07', activity: 'Attended Art Class', duration: 60 },
    ],
    recommendations: [
      { type: 'AI', title: 'Math Tutoring', description: 'Schedule weekly math tutoring sessions', priority: 'high' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 50, lastActive: '6 days ago', grade: 'F', needsAttention: true, recommendations: ['Schedule one-on-one tutoring sessions', 'Provide additional practice worksheets'] },
      { id: 2, title: 'Introduction to Science for Kids', progress: 60, lastActive: '5 days ago', grade: 'D' },
    ],
    needsAttention: true,
    generalRecommendations: ['Schedule parent-teacher conference'],
  },
  // Low performer
  {
    id: 8,
    name: 'Aylin Sari',
    grade: 'Grade 3',
    overallProgress: 48,
    averageGrade: 52,
    attendance: 78,
    status: 'active',
    strengths: ['Empathy'],
    areasForImprovement: ['Science', 'Reading Comprehension'],
    learningStyle: 'Interpersonal',
    recentActivity: [
      { date: '2024-05-06', activity: 'Missed Science Lab', duration: 0 },
      { date: '2024-05-05', activity: 'Attended Counseling', duration: 30 },
    ],
    recommendations: [
      { type: 'AI', title: 'Science Support', description: 'Provide simplified science reading materials', priority: 'high' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 55, lastActive: '7 days ago', grade: 'D', needsAttention: true, recommendations: ['Schedule science lab sessions', 'Provide simplified science reading materials'] },
      { id: 2, title: 'Introduction to Science for Kids', progress: 40, lastActive: '6 days ago', grade: 'F', needsAttention: true, recommendations: ['Create engaging science experiments', 'Consider science study group'] },
    ],
    needsAttention: true,
    generalRecommendations: ['Focus on building science engagement'],
  },
  // Low performer
  {
    id: 9,
    name: 'Burak Erden',
    grade: 'Grade 4',
    overallProgress: 39,
    averageGrade: 45,
    attendance: 70,
    status: 'active',
    strengths: ['Persistence'],
    areasForImprovement: ['Math Skills', 'Science', 'Attendance'],
    learningStyle: 'Logical/Mathematical',
    recentActivity: [
      { date: '2024-05-04', activity: 'Missed Class', duration: 0 },
      { date: '2024-05-03', activity: 'Late to School', duration: 0 },
    ],
    recommendations: [
      { type: 'AI', title: 'Attendance Monitoring', description: 'Monitor attendance patterns and intervene early', priority: 'high' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 35, lastActive: '8 days ago', grade: 'F', needsAttention: true, recommendations: ['Urgent intervention needed', 'Schedule daily math practice sessions'] },
      { id: 2, title: 'Introduction to Science for Kids', progress: 30, lastActive: '7 days ago', grade: 'F', needsAttention: true, recommendations: ['Urgent intervention needed', 'Schedule daily science practice'] },
    ],
    needsAttention: true,
    generalRecommendations: ['Immediate parent-teacher conference required'],
  },
  // Low performer
  {
    id: 10,
    name: 'Lale Tamer',
    grade: 'Grade 3',
    overallProgress: 28,
    averageGrade: 32,
    attendance: 60,
    status: 'active',
    strengths: ['Creativity'],
    areasForImprovement: ['Math Skills', 'Science', 'Reading Comprehension', 'Attendance'],
    learningStyle: 'Visual and Kinesthetic',
    recentActivity: [
      { date: '2024-05-02', activity: 'Missed Multiple Classes', duration: 0 },
      { date: '2024-05-01', activity: 'Attended Art Class', duration: 60 },
    ],
    recommendations: [
      { type: 'AI', title: 'Comprehensive Support', description: 'Create intensive intervention plan', priority: 'high' },
    ],
    enrolledCourses: [
      { id: 1, title: 'Fun with Basic Mathematics', progress: 20, lastActive: '10 days ago', grade: 'F', needsAttention: true, recommendations: ['Immediate intervention required', 'Daily check-ins'] },
      { id: 2, title: 'Introduction to Science for Kids', progress: 15, lastActive: '9 days ago', grade: 'F', needsAttention: true, recommendations: ['Comprehensive learning assessment', 'Peer tutoring'] },
    ],
    needsAttention: true,
    generalRecommendations: ['Consider additional learning support services'],
  },
]; 