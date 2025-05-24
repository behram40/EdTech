// Mock data for student profiles
export const mockStudentData = {
  'student1@edtech.com': {
    name: 'Aslan Demir',
    email: 'student1@edtech.com',
    userType: 'student',
    grade: '4th Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 96,
      averageGrade: 98,
      attendance: 100,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Elementary Math: Numbers and Operations',
        progress: 98,
        lastAccessed: '2 hours ago',
        grade: '4th Grade',
        category: 'Mathematics',
        assignments: [
          { title: 'Multiplication Tables', score: 100, date: '2024-02-20' },
          { title: 'Division Practice', score: 95, date: '2024-02-18' },
          { title: 'Fractions Quiz', score: 100, date: '2024-02-15' }
        ]
      },
      {
        id: 2,
        title: 'Science for Kids: Plants and Animals',
        progress: 94,
        lastAccessed: '1 day ago',
        grade: '4th Grade',
        category: 'Science',
        assignments: [
          { title: 'Plant Life Cycle', score: 100, date: '2024-02-19' },
          { title: 'Animal Classification', score: 98, date: '2024-02-17' },
          { title: 'Ecosystem Project', score: 95, date: '2024-02-14' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Math Master',
        description: 'Completed all math assignments with perfect scores',
        date: '2024-02-20',
        grade: '4th Grade'
      },
      {
        id: 2,
        title: 'Science Explorer',
        description: 'Outstanding performance in science projects',
        date: '2024-02-19',
        grade: '4th Grade'
      },
      {
        id: 3,
        title: 'Perfect Attendance',
        description: 'No absences this semester',
        date: '2024-02-15',
        grade: '4th Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Excellent mathematical reasoning',
        'Strong analytical skills',
        'Consistent performance across subjects'
      ],
      areasForImprovement: [
        'Could participate more in class discussions',
        'Consider taking on more challenging projects'
      ],
      recommendations: [
        'Consider advanced math enrichment',
        'Join the science club',
        'Participate in math competitions'
      ],
      learningStyle: 'Visual and analytical learner with strong problem-solving abilities'
    }
  },
  'student2@edtech.com': {
    name: 'Melis Polat',
    email: 'student2@edtech.com',
    userType: 'student',
    grade: '3rd Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 89,
      averageGrade: 91,
      attendance: 98,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Reading and Writing: Story Time',
        progress: 92,
        lastAccessed: '3 hours ago',
        grade: '3rd Grade',
        category: 'Language Arts',
        assignments: [
          { title: 'Creative Writing', score: 95, date: '2024-02-20' },
          { title: 'Reading Comprehension', score: 88, date: '2024-02-18' },
          { title: 'Vocabulary Quiz', score: 90, date: '2024-02-15' }
        ]
      },
      {
        id: 2,
        title: 'Elementary Math: Numbers and Operations',
        progress: 86,
        lastAccessed: '2 days ago',
        grade: '3rd Grade',
        category: 'Mathematics',
        assignments: [
          { title: 'Addition and Subtraction', score: 90, date: '2024-02-19' },
          { title: 'Number Patterns', score: 85, date: '2024-02-17' },
          { title: 'Basic Multiplication', score: 88, date: '2024-02-14' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Reading Champion',
        description: 'Read 25 books this semester',
        date: '2024-02-20',
        grade: '3rd Grade'
      },
      {
        id: 2,
        title: 'Creative Writer',
        description: 'Excellent story writing skills',
        date: '2024-02-18',
        grade: '3rd Grade'
      },
      {
        id: 3,
        title: 'Math Explorer',
        description: 'Completed all math challenges',
        date: '2024-02-15',
        grade: '3rd Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Strong reading comprehension',
        'Creative writing abilities',
        'Good mathematical foundation'
      ],
      areasForImprovement: [
        'Practice more complex math problems',
        'Work on spelling and grammar'
      ],
      recommendations: [
        'Join the reading club',
        'Participate in writing competitions',
        'Try more challenging math exercises'
      ],
      learningStyle: 'Creative and imaginative learner with good verbal skills'
    }
  },
  'student3@edtech.com': {
    name: 'Selin Arslan',
    email: 'student3@edtech.com',
    userType: 'student',
    grade: '4th Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 85,
      averageGrade: 87,
      attendance: 97,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Science for Kids: Plants and Animals',
        progress: 88,
        lastAccessed: '1 day ago',
        grade: '4th Grade',
        category: 'Science',
        assignments: [
          { title: 'Plant Growth Experiment', score: 90, date: '2024-02-20' },
          { title: 'Animal Research Project', score: 85, date: '2024-02-18' },
          { title: 'Science Quiz', score: 88, date: '2024-02-15' }
        ]
      },
      {
        id: 2,
        title: 'Social Studies: Our Community',
        progress: 82,
        lastAccessed: '2 days ago',
        grade: '4th Grade',
        category: 'Social Studies',
        assignments: [
          { title: 'Community Project', score: 85, date: '2024-02-19' },
          { title: 'Geography Quiz', score: 80, date: '2024-02-17' },
          { title: 'History Timeline', score: 82, date: '2024-02-14' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Science Explorer',
        description: 'Outstanding science project presentation',
        date: '2024-02-20',
        grade: '4th Grade'
      },
      {
        id: 2,
        title: 'Community Helper',
        description: 'Active participation in community projects',
        date: '2024-02-18',
        grade: '4th Grade'
      },
      {
        id: 3,
        title: 'Team Player',
        description: 'Excellent group work skills',
        date: '2024-02-15',
        grade: '4th Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Strong scientific inquiry skills',
        'Good social awareness',
        'Team collaboration abilities'
      ],
      areasForImprovement: [
        'Work on time management',
        'Practice more independent work'
      ],
      recommendations: [
        'Join the science club',
        'Participate in community service',
        'Try leadership roles in group projects'
      ],
      learningStyle: 'Hands-on learner with strong social skills'
    }
  },
  'student4@edtech.com': {
    name: 'Kenan Yaman',
    email: 'student4@edtech.com',
    userType: 'student',
    grade: '4th Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 60,
      averageGrade: 62,
      attendance: 85,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Elementary Math: Numbers and Operations',
        progress: 55,
        lastAccessed: '3 days ago',
        grade: '4th Grade',
        category: 'Mathematics',
        assignments: [
          { title: 'Multiplication Tables', score: 60, date: '2024-02-20' },
          { title: 'Division Practice', score: 58, date: '2024-02-18' }
        ]
      },
      {
        id: 2,
        title: 'Science for Kids: Plants and Animals',
        progress: 65,
        lastAccessed: '2 days ago',
        grade: '4th Grade',
        category: 'Science',
        assignments: [
          { title: 'Plant Life Cycle', score: 65, date: '2024-02-19' },
          { title: 'Animal Classification', score: 62, date: '2024-02-17' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Attendance Improved',
        description: 'Improved attendance this semester',
        date: '2024-02-15',
        grade: '4th Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Shows effort in class',
        'Willing to ask for help'
      ],
      areasForImprovement: [
        'Needs to focus on homework',
        'Should participate more in class'
      ],
      recommendations: [
        'Attend after-school tutoring',
        'Complete all homework assignments',
        'Ask questions during lessons'
      ],
      learningStyle: 'Needs more structure and support'
    }
  },
  'student5@edtech.com': {
    name: 'Sibel Aydin',
    email: 'student5@edtech.com',
    userType: 'student',
    grade: '3rd Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 75,
      averageGrade: 78,
      attendance: 92,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Reading and Writing: Story Time',
        progress: 80,
        lastAccessed: '1 day ago',
        grade: '3rd Grade',
        category: 'Language Arts',
        assignments: [
          { title: 'Creative Writing', score: 80, date: '2024-02-20' },
          { title: 'Reading Comprehension', score: 75, date: '2024-02-18' }
        ]
      },
      {
        id: 2,
        title: 'Elementary Math: Numbers and Operations',
        progress: 70,
        lastAccessed: '2 days ago',
        grade: '3rd Grade',
        category: 'Mathematics',
        assignments: [
          { title: 'Addition and Subtraction', score: 75, date: '2024-02-19' },
          { title: 'Number Patterns', score: 78, date: '2024-02-17' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Consistent Reader',
        description: 'Reads regularly and completes assignments',
        date: '2024-02-18',
        grade: '3rd Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Good reading comprehension',
        'Participates in group work'
      ],
      areasForImprovement: [
        'Needs to improve math skills',
        'Should review spelling rules'
      ],
      recommendations: [
        'Practice math daily',
        'Join a spelling club',
        'Participate in group discussions'
      ],
      learningStyle: 'Learns well with peers and discussion'
    }
  },
  'student6@edtech.com': {
    name: 'Deniz Korkmaz',
    email: 'student6@edtech.com',
    userType: 'student',
    grade: '4th Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 95,
      averageGrade: 97,
      attendance: 99,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Elementary Math: Numbers and Operations',
        progress: 99,
        lastAccessed: '1 hour ago',
        grade: '4th Grade',
        category: 'Mathematics',
        assignments: [
          { title: 'Multiplication Tables', score: 100, date: '2024-02-20' },
          { title: 'Division Practice', score: 98, date: '2024-02-18' }
        ]
      },
      {
        id: 2,
        title: 'Science for Kids: Plants and Animals',
        progress: 96,
        lastAccessed: '2 hours ago',
        grade: '4th Grade',
        category: 'Science',
        assignments: [
          { title: 'Plant Life Cycle', score: 97, date: '2024-02-19' },
          { title: 'Animal Classification', score: 96, date: '2024-02-17' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Top of the Class',
        description: 'Highest grades in all subjects',
        date: '2024-02-20',
        grade: '4th Grade'
      },
      {
        id: 2,
        title: 'Perfect Attendance',
        description: 'No absences this semester',
        date: '2024-02-15',
        grade: '4th Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Exceptional math skills',
        'Quick learner',
        'Helps classmates'
      ],
      areasForImprovement: [
        'Could participate more in art class'
      ],
      recommendations: [
        'Join math competitions',
        'Try art club',
        'Help tutor peers'
      ],
      learningStyle: 'Independent and motivated learner'
    }
  },
  'student7@edtech.com': {
    name: 'Efe Baran',
    email: 'student7@edtech.com',
    userType: 'student',
    grade: '3rd Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 50,
      averageGrade: 55,
      attendance: 80,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Reading and Writing: Story Time',
        progress: 45,
        lastAccessed: '5 days ago',
        grade: '3rd Grade',
        category: 'Language Arts',
        assignments: [
          { title: 'Creative Writing', score: 50, date: '2024-02-20' },
          { title: 'Reading Comprehension', score: 55, date: '2024-02-18' }
        ]
      },
      {
        id: 2,
        title: 'Elementary Math: Numbers and Operations',
        progress: 55,
        lastAccessed: '4 days ago',
        grade: '3rd Grade',
        category: 'Mathematics',
        assignments: [
          { title: 'Addition and Subtraction', score: 60, date: '2024-02-19' },
          { title: 'Number Patterns', score: 50, date: '2024-02-17' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Improved Participation',
        description: 'Started participating more in class',
        date: '2024-02-18',
        grade: '3rd Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Tries hard',
        'Attends extra help sessions'
      ],
      areasForImprovement: [
        'Needs to improve reading skills',
        'Should focus on homework'
      ],
      recommendations: [
        'Read 10 minutes daily',
        'Ask for help when needed',
        'Complete all assignments'
      ],
      learningStyle: 'Needs encouragement and support'
    }
  },
  'student8@edtech.com': {
    name: 'Aylin Sari',
    email: 'student8@edtech.com',
    userType: 'student',
    grade: '4th Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 85,
      averageGrade: 88,
      attendance: 95,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Science for Kids: Plants and Animals',
        progress: 90,
        lastAccessed: '1 day ago',
        grade: '4th Grade',
        category: 'Science',
        assignments: [
          { title: 'Plant Growth Experiment', score: 90, date: '2024-02-20' },
          { title: 'Animal Research Project', score: 85, date: '2024-02-18' }
        ]
      },
      {
        id: 2,
        title: 'Social Studies: Our Community',
        progress: 80,
        lastAccessed: '2 days ago',
        grade: '4th Grade',
        category: 'Social Studies',
        assignments: [
          { title: 'Community Project', score: 85, date: '2024-02-19' },
          { title: 'Geography Quiz', score: 80, date: '2024-02-17' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Science Enthusiast',
        description: 'Shows great interest in science',
        date: '2024-02-20',
        grade: '4th Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Curious and asks questions',
        'Works well in groups'
      ],
      areasForImprovement: [
        'Needs to review social studies material'
      ],
      recommendations: [
        'Participate in science fairs',
        'Review notes after class',
        'Join study groups'
      ],
      learningStyle: 'Collaborative and hands-on learner'
    }
  },
  'student9@edtech.com': {
    name: 'Burak Erden',
    email: 'student9@edtech.com',
    userType: 'student',
    grade: '3rd Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 70,
      averageGrade: 72,
      attendance: 90,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Reading and Writing: Story Time',
        progress: 75,
        lastAccessed: '2 days ago',
        grade: '3rd Grade',
        category: 'Language Arts',
        assignments: [
          { title: 'Creative Writing', score: 70, date: '2024-02-20' },
          { title: 'Reading Comprehension', score: 72, date: '2024-02-18' }
        ]
      },
      {
        id: 2,
        title: 'Elementary Math: Numbers and Operations',
        progress: 65,
        lastAccessed: '3 days ago',
        grade: '3rd Grade',
        category: 'Mathematics',
        assignments: [
          { title: 'Addition and Subtraction', score: 70, date: '2024-02-19' },
          { title: 'Number Patterns', score: 72, date: '2024-02-17' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Steady Progress',
        description: 'Consistent improvement in assignments',
        date: '2024-02-18',
        grade: '3rd Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Consistent effort',
        'Willing to learn'
      ],
      areasForImprovement: [
        'Needs to improve math skills',
        'Should participate more in class'
      ],
      recommendations: [
        'Practice math daily',
        'Ask questions in class',
        'Review homework before submission'
      ],
      learningStyle: 'Learns best with repetition and review'
    }
  },
  'student10@edtech.com': {
    name: 'Lale Tamer',
    email: 'student10@edtech.com',
    userType: 'student',
    grade: '4th Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    statistics: {
      overallProgress: 98,
      averageGrade: 99,
      attendance: 100,
      totalCourses: 2
    },
    enrolledCourses: [
      {
        id: 1,
        title: 'Elementary Math: Numbers and Operations',
        progress: 100,
        lastAccessed: '1 hour ago',
        grade: '4th Grade',
        category: 'Mathematics',
        assignments: [
          { title: 'Multiplication Tables', score: 100, date: '2024-02-20' },
          { title: 'Division Practice', score: 99, date: '2024-02-18' }
        ]
      },
      {
        id: 2,
        title: 'Science for Kids: Plants and Animals',
        progress: 98,
        lastAccessed: '2 hours ago',
        grade: '4th Grade',
        category: 'Science',
        assignments: [
          { title: 'Plant Life Cycle', score: 99, date: '2024-02-19' },
          { title: 'Animal Classification', score: 98, date: '2024-02-17' }
        ]
      }
    ],
    achievements: [
      {
        id: 1,
        title: 'Outstanding Student',
        description: 'Top grades and perfect attendance',
        date: '2024-02-20',
        grade: '4th Grade'
      },
      {
        id: 2,
        title: 'Math Genius',
        description: 'Perfect scores in all math assignments',
        date: '2024-02-20',
        grade: '4th Grade'
      }
    ],
    aiReports: {
      strengths: [
        'Exceptional academic performance',
        'Highly motivated',
        'Helps others in class'
      ],
      areasForImprovement: [
        'Could participate more in group activities'
      ],
      recommendations: [
        'Join advanced classes',
        'Lead group projects',
        'Participate in competitions'
      ],
      learningStyle: 'Self-driven and goal-oriented learner'
    }
  }
}

// Mock data for other user types
export const mockUserData = {
  // Students
  'student1@edtech.com': {
    name: 'Aslan Demir',
    email: 'student1@edtech.com',
    userType: 'student',
    grade: '4th Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    password: '123456'
  },
  'student2@edtech.com': {
    name: 'Melis Polat',
    email: 'student2@edtech.com',
    userType: 'student',
    grade: '3rd Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    password: '123456'
  },
  'student3@edtech.com': {
    name: 'Selin Arslan',
    email: 'student3@edtech.com',
    userType: 'student',
    grade: '4th Grade',
    joinDate: '2023-09-01',
    school: 'Elementary School',
    password: '123456'
  },
  // Teachers
  'teacher1@edtech.com': {
    name: 'Ayse Demir',
    email: 'teacher1@edtech.com',
    userType: 'teacher',
    subjects: ['Mathematics', 'Physics'],
    gradeLevels: ['Elementary', 'Middle School'],
    experience: '10 years',
    specialization: 'STEM Education',
    studentEmails: [
      'student1@edtech.com', 'student4@edtech.com', 'student6@edtech.com', 'student10@edtech.com'
    ],
    averageRating: 4.7,
    password: '123456'
  },
  'teacher2@edtech.com': {
    name: 'Mehmet Yilmaz',
    email: 'teacher2@edtech.com',
    userType: 'teacher',
    subjects: ['English', 'Literature'],
    gradeLevels: ['Elementary', 'Middle School'],
    experience: '8 years',
    specialization: 'Language Arts',
    studentEmails: [
      'student2@edtech.com', 'student5@edtech.com', 'student7@edtech.com', 'student9@edtech.com'
    ],
    averageRating: 3.2,
    password: '123456'
  },
  'teacher3@edtech.com': {
    name: 'Zeynep Kaya',
    email: 'teacher3@edtech.com',
    userType: 'teacher',
    subjects: ['Biology', 'Chemistry'],
    gradeLevels: ['Middle School', 'High School'],
    experience: '12 years',
    specialization: 'Science Education',
    studentEmails: [
      'student3@edtech.com', 'student6@edtech.com', 'student8@edtech.com', 'student10@edtech.com'
    ],
    averageRating: 4.1,
    password: '123456'
  },
  'teacher4@edtech.com': {
    name: 'Okan Aydin',
    email: 'teacher4@edtech.com',
    userType: 'teacher',
    subjects: ['History', 'Social Studies'],
    gradeLevels: ['Elementary', 'Middle School'],
    experience: '7 years',
    specialization: 'Social Sciences',
    studentEmails: [
      'student1@edtech.com', 'student2@edtech.com', 'student5@edtech.com', 'student8@edtech.com'
    ],
    averageRating: 2.9,
    password: '123456'
  },
  'teacher5@edtech.com': {
    name: 'Selin Ozturk',
    email: 'teacher5@edtech.com',
    userType: 'teacher',
    subjects: ['Computer Science', 'Programming'],
    gradeLevels: ['Middle School', 'High School'],
    experience: '5 years',
    specialization: 'Technology Education',
    studentEmails: [
      'student3@edtech.com', 'student4@edtech.com', 'student7@edtech.com', 'student9@edtech.com'
    ],
    averageRating: 3.8,
    password: '123456'
  },
  // School Admin
  'school-admin@edtech.com': {
    name: 'Ahmet Yildiz',
    email: 'school-admin@edtech.com',
    userType: 'school-admin',
    role: 'School Administrator',
    department: 'Administration',
    password: '123456'
  },
  // System Admin
  'admin@edtech.com': {
    name: 'Admin User',
    email: 'admin@edtech.com',
    userType: 'admin',
    role: 'System Administrator',
    department: 'IT',
    password: '123456'
  },
  "schooladmin@example.com": {
    email: "schooladmin@example.com",
    userType: "school-admin",
    name: "School Admin",
    password: "123456"
    // ...other fields as needed...
  }
} 