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
  },
  pagination: {
    previous: "Previous",
    next: "Next",
  },
  auth: {
    title: "Login",
    studentId: "Student ID",
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
  },
} as const;
