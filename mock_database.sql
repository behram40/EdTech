-- Mock Database for EdTech Platform
-- This is a demonstration database with fake data

-- Users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Courses Table
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    teacher_id INTEGER REFERENCES users(user_id),
    start_date DATE,
    end_date DATE,
    max_students INTEGER DEFAULT 30,
    is_active BOOLEAN DEFAULT true
);

-- Enrollments Table
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES users(user_id),
    course_id INTEGER REFERENCES courses(course_id),
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'dropped')),
    UNIQUE(student_id, course_id)
);

-- Assignments Table
CREATE TABLE assignments (
    assignment_id SERIAL PRIMARY KEY,
    course_id INTEGER REFERENCES courses(course_id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP,
    total_points INTEGER DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Submissions Table
CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,
    assignment_id INTEGER REFERENCES assignments(assignment_id),
    student_id INTEGER REFERENCES users(user_id),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    grade DECIMAL(5,2),
    feedback TEXT,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'graded', 'late'))
);

-- Sample Data Insertion
-- Insert Teachers (using mock credentials from README)
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('teacher1@edtech.edu', 'hashed_password_1', 'Sarah', 'Anderson', 'teacher'),
('teacher2@edtech.edu', 'hashed_password_2', 'Michael', 'Chen', 'teacher'),
('admin@edtech.edu', 'hashed_password_3', 'Admin', 'User', 'admin');

-- Insert Students (using mock credentials from README)
INSERT INTO users (email, password_hash, first_name, last_name, role) VALUES
('student1@edtech.edu', 'hashed_password_4', 'Emma', 'Wilson', 'student'),
('student2@edtech.edu', 'hashed_password_5', 'James', 'Brown', 'student'),
('student3@edtech.edu', 'hashed_password_6', 'Sophia', 'Martinez', 'student'),
('student4@edtech.edu', 'hashed_password_7', 'Lucas', 'Taylor', 'student'),
('student5@edtech.edu', 'hashed_password_8', 'Olivia', 'Garcia', 'student');

-- Insert Courses (with more diverse data)
INSERT INTO courses (title, description, teacher_id, start_date, end_date, max_students) VALUES
('Introduction to Programming', 'Learn Python and basic programming concepts', 1, '2024-01-15', '2024-05-15', 25),
('Data Science Fundamentals', 'Introduction to data analysis and visualization', 2, '2024-01-15', '2024-05-15', 20),
('Web Development', 'Full-stack development with modern frameworks', 1, '2024-02-01', '2024-06-01', 30),
('Machine Learning Basics', 'Introduction to ML algorithms and applications', 2, '2024-02-15', '2024-06-15', 15);

-- Insert Enrollments (more realistic distribution)
INSERT INTO enrollments (student_id, course_id, enrollment_date, status) VALUES
(4, 1, '2024-01-10 09:00:00', 'active'),
(5, 1, '2024-01-10 09:15:00', 'active'),
(6, 1, '2024-01-10 10:00:00', 'active'),
(7, 2, '2024-01-11 14:00:00', 'active'),
(8, 2, '2024-01-11 14:30:00', 'active'),
(4, 3, '2024-01-25 11:00:00', 'active'),
(5, 3, '2024-01-25 11:30:00', 'active'),
(6, 4, '2024-02-01 13:00:00', 'active'),
(7, 4, '2024-02-01 13:15:00', 'active'),
(8, 1, '2024-01-12 15:00:00', 'active');

-- Insert Assignments (with more varied data)
INSERT INTO assignments (course_id, title, description, due_date, total_points) VALUES
(1, 'Python Basics Quiz', 'Basic Python syntax and data types', '2024-02-15 23:59:59', 100),
(1, 'Functions Project', 'Create a calculator using Python functions', '2024-03-01 23:59:59', 150),
(2, 'Data Analysis Project', 'Analyze a real-world dataset', '2024-02-20 23:59:59', 200),
(2, 'Visualization Assignment', 'Create data visualizations using Python', '2024-03-10 23:59:59', 150),
(3, 'HTML/CSS Portfolio', 'Build a personal portfolio website', '2024-03-15 23:59:59', 200),
(3, 'JavaScript Project', 'Create an interactive web application', '2024-04-01 23:59:59', 250),
(4, 'ML Model Implementation', 'Implement a basic classification model', '2024-03-20 23:59:59', 300);

-- Insert Submissions (with more realistic grades and feedback)
INSERT INTO submissions (assignment_id, student_id, grade, feedback, status, submitted_at) VALUES
(1, 4, 95.00, 'Excellent understanding of Python basics!', 'graded', '2024-02-14 15:30:00'),
(1, 5, 88.50, 'Good work, but could improve on list comprehensions.', 'graded', '2024-02-14 16:45:00'),
(1, 6, 92.00, 'Very well done! Great code organization.', 'graded', '2024-02-14 17:20:00'),
(2, 4, 94.00, 'Excellent calculator implementation!', 'graded', '2024-02-28 14:15:00'),
(2, 5, 87.00, 'Good work, but some edge cases missing.', 'graded', '2024-02-28 15:30:00'),
(3, 7, 91.00, 'Great data analysis!', 'graded', '2024-02-19 16:00:00'),
(3, 8, 85.00, 'Good analysis, but could improve documentation.', 'graded', '2024-02-19 17:30:00'),
(4, 7, 89.00, 'Nice visualizations!', 'graded', '2024-03-09 15:45:00'),
(5, 4, 96.00, 'Outstanding portfolio design!', 'graded', '2024-03-14 14:30:00'),
(5, 5, 90.00, 'Good design, but could improve responsiveness.', 'graded', '2024-03-14 16:00:00');

-- Create some views for common queries
CREATE VIEW student_grades AS
SELECT 
    u.first_name,
    u.last_name,
    c.title as course_title,
    a.title as assignment_title,
    s.grade,
    s.submitted_at
FROM users u
JOIN submissions s ON u.user_id = s.student_id
JOIN assignments a ON s.assignment_id = a.assignment_id
JOIN courses c ON a.course_id = c.course_id
WHERE u.role = 'student';

CREATE VIEW course_enrollment_summary AS
SELECT 
    c.title as course_title,
    COUNT(e.student_id) as enrolled_students,
    c.max_students,
    u.first_name as teacher_first_name,
    u.last_name as teacher_last_name
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
LEFT JOIN users u ON c.teacher_id = u.user_id
GROUP BY c.course_id, u.first_name, u.last_name;

-- Analytical Views for Charting
-- 1. Course Enrollment Distribution (Pie Chart)
CREATE VIEW course_enrollment_chart AS
SELECT 
    c.title as course_name,
    COUNT(e.student_id) as student_count,
    ROUND(COUNT(e.student_id)::numeric / c.max_students * 100, 2) as enrollment_percentage
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_id, c.title, c.max_students;

-- 2. Student Performance Over Time (Line Chart)
CREATE VIEW student_performance_trend AS
SELECT 
    u.first_name || ' ' || u.last_name as student_name,
    c.title as course_name,
    a.title as assignment_name,
    s.submitted_at::date as submission_date,
    s.grade,
    a.total_points
FROM users u
JOIN submissions s ON u.user_id = s.student_id
JOIN assignments a ON s.assignment_id = a.assignment_id
JOIN courses c ON a.course_id = c.course_id
WHERE u.role = 'student'
ORDER BY u.user_id, s.submitted_at;

-- 3. Assignment Completion Rates (Bar Chart)
CREATE VIEW assignment_completion_rates AS
SELECT 
    c.title as course_name,
    a.title as assignment_name,
    COUNT(s.submission_id) as submissions_count,
    COUNT(DISTINCT e.student_id) as enrolled_students,
    ROUND(COUNT(s.submission_id)::numeric / COUNT(DISTINCT e.student_id) * 100, 2) as completion_rate
FROM courses c
JOIN assignments a ON c.course_id = a.course_id
LEFT JOIN enrollments e ON c.course_id = e.course_id
LEFT JOIN submissions s ON a.assignment_id = s.assignment_id
GROUP BY c.course_id, c.title, a.assignment_id, a.title;

-- 4. Grade Distribution (Histogram)
CREATE VIEW grade_distribution AS
SELECT 
    c.title as course_name,
    CASE 
        WHEN s.grade >= 90 THEN 'A (90-100)'
        WHEN s.grade >= 80 THEN 'B (80-89)'
        WHEN s.grade >= 70 THEN 'C (70-79)'
        WHEN s.grade >= 60 THEN 'D (60-69)'
        ELSE 'F (0-59)'
    END as grade_range,
    COUNT(*) as student_count
FROM courses c
JOIN assignments a ON c.course_id = a.course_id
JOIN submissions s ON a.assignment_id = s.assignment_id
GROUP BY c.title, grade_range
ORDER BY c.title, 
    CASE grade_range
        WHEN 'A (90-100)' THEN 1
        WHEN 'B (80-89)' THEN 2
        WHEN 'C (70-79)' THEN 3
        WHEN 'D (60-69)' THEN 4
        ELSE 5
    END;

-- 5. Teacher Workload Analysis (Stacked Bar Chart)
CREATE VIEW teacher_workload AS
SELECT 
    u.first_name || ' ' || u.last_name as teacher_name,
    c.title as course_name,
    COUNT(DISTINCT a.assignment_id) as total_assignments,
    COUNT(DISTINCT s.submission_id) as total_submissions,
    COUNT(DISTINCT e.student_id) as total_students
FROM users u
JOIN courses c ON u.user_id = c.teacher_id
LEFT JOIN assignments a ON c.course_id = a.course_id
LEFT JOIN submissions s ON a.assignment_id = s.assignment_id
LEFT JOIN enrollments e ON c.course_id = e.course_id
WHERE u.role = 'teacher'
GROUP BY u.user_id, u.first_name, u.last_name, c.course_id, c.title; 