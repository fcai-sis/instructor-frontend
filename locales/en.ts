// locales/en.ts
export default {
  general: {
    loading: "Loading...",
    submit: "Submit",
    ok: "OK",
    cancel: "Cancel",
    back: "Back",
    error: {
      somethingWentWrong: "Something went wrong",
    },
    remove: "Remove",
    close: "Close",
  },
  nav: {
    home: "Home",
    students: "Students",
    announcements: "Announcements",
    serviceRequests: "Service Requests",
    instructors: "Instructors",
    teacherAssistants: "Teacher Assistants",
    profile: "Profile",
    more: "More",
    signOut: "Sign Out",
    graduation: "Create Graduation Project Team",
    assignHall: "Assign Students to Halls",
    top: "Top Students",
    courses: "View all courses",
  },
  pagination: {
    previous: "Previous",
    next: "Next",
  },
  auth: {
    title: "Login",
    instructorEmail: "Email",
    password: "Password",
    login: "Login",
    success: "Successfully signed in",
    error: {
      invalidCredentials: "Invalid credentials",
    },
  },
  home: {
    title: "Home",
    greeting: "Hello, {name}",
    search: "Search",
    searchPlaceholder: "Search for something",
    announcements: "Announcements",
    viewAllAnnouncements: "View All Announcements",
    serviceRequests: "Service Requests",
    viewAllServiceRequests: "View All Service Requests",
    schedule: "My Schedule",
  },
  students: {
    title: "Students",
    noStudents: "No students",
    registerStudent: "Register Student",
  },
  registerStudent: {
    title: "Register Student",
    manual: {
      title: "Manual Student Registration",
    },
    upload: {
      title: "Register Students from Excel File",
      uploadExcelFile: "Upload File",
      success: "File uploaded successfully",
      mapping: {
        title: "Map Columns",
        instructions:
          "Map the columns in the Excel file to the fields in the database",
        unset: "Select a field",
        success: {
          updateField: "Field mapping updated successfully",
          cancel: "Registration session cancelled successfully",
        },
        error: {
          missingColumns: "Please map all columns",
          updateFailed: "Failed to update field mapping",
          cancelFailed: "Failed to cancel registration session",
        },
      },
      commit: {
        title: "Commit Registration Session",
        success: "Registration session committed successfully",
        error: {
          commitFailed: "Failed to commit registration session",
          row: "Failed to commit row {rowNumber}",
        },
      },
    },
  },
  courses: {
    title: "Courses",
  },
  myCourses: {
    title: "My Courses",
    noCourses: "No courses",
  },
  evaluation: {
    selectRating: "Select Rating",
  },
  announcements: {
    title: "Announcements",
    noAnnouncements: "No announcements",
    create: {
      title: "Create Announcement",
      form: {
        title: "Title",
        content: "Content",
        severity: "Severity",
        info: "Info",
        warning: "Warning",
        danger: "Danger",
        departments: "Departments",
        levels: "Levels",
      },
      success: "Announcement created successfully",
      error: {
        createFailed: "Failed to create announcement",
      },
    },
  },
  serviceRequests: {
    title: "Service Requests",
    noServiceRequests: "No service requests",
    createServiceRequest: "Create Service Request",
  },
  profile: {
    title: "Profile",
    name: "Name",
    email: "Email",
    updating: "Updating...",
    update: "Update Profile",
    success: "Profile updated successfully",
    error: {
      updateFailed: "Failed to update profile",
    },
  },
  graduation: {
    title: "Create a Graduation Project Team",
    enrollments: "Enrollments",
    instructorTeachings: "Instructor Teachings",
    assistantTeachings: "TA Teachings",
    selectEnrollment: "Select Enrollment",
    selectInstructorTeaching: "Select Instructor Teaching",
    selectAssistantTeaching: "Select TA Teaching",
    addEnrollment: "Add Enrollment",
    addInstructorTeaching: "Add Instructor Teaching",
    addAssistantTeaching: "Add TA Teaching",
    success: "Team created successfully",
    error: {
      createFailed: "Failed to create team",
    },
    search: "Search",
  },
  filter: {
    search: "Search",
    department: "Department",
    gender: "Gender",
    level: "Level",
    title: "Title",
  },
  teachings: {
    updateGrade: "Update Grade",
    termWorkGrade: "Term Work Grade",
    finalExamGrade: "Final Exam Grade",
    success: "Grade updated successfully",
    error: {
      updateFailed: "Failed to update grade",
    },
  },
  instructorTa: {
    instructorTitle: "Instructors",
    assistantTitle: "Teaching Assistants",
    name: "Name",
    title: "Title",
    email: "Email",
    department: "Department",
    officeHours: "Office Hours",
    office: "Office",
  },
} as const;
