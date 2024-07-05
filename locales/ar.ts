// locales/ar.ts
export default {
  general: {
    loading: "جاري التحميل...",
    submit: "إرسال",
    ok: "تم",
    confirm: "تأكيد",
    cancel: "إلغاء",
    back: "رجوع",
    error: {
      somethingWentWrong: "حدث خطأ ما",
    },
    remove: "حذف",
    close: "إغلاق",
  },
  nav: {
    home: "الصفحة الرئيسية",
    students: "الطلاب",
    announcements: "الإعلانات",
    serviceRequests: "طلبات الخدمة",
    profile: "الملف الشخصي",
    instructors: "الدكاترة",
    teacherAssistants: "المعيدين",
    more: "المزيد",
    signOut: "تسجيل الخروج",
    graduation: "إنشاء فريق مشروع التخرج",
    assignHall: "تعيين الطلاب للقاعات",
    top: "الطلاب المتميزين",
    courses: "عرض جميع المقررات",
  },
  pagination: {
    previous: "السابق",
    next: "التالي",
  },
  auth: {
    title: "تسجيل الدخول",
    instructorEmail: "البريد الإلكتروني",
    password: "كلمة المرور",
    login: "تسجيل الدخول",
    success: "تم تسجيل الدخول بنجاح",
    error: {
      invalidCredentials: "بيانات الاعتماد غير صحيحة",
    },
  },
  home: {
    title: "الصفحة الرئيسية",
    greeting: "مرحبا، {name}",
    search: "بحث",
    searchPlaceholder: "ابحث عن شيء",
    announcements: "الإعلانات",
    viewAllAnnouncements: "عرض جميع الإعلانات",
    serviceRequests: "طلبات الخدمة",
    viewAllServiceRequests: "عرض جميع طلبات الخدمة",
    schedule: "جدولي",
  },
  students: {
    title: "الطلاب",
    noStudents: "لا يوجد طلاب",
    registerStudent: "تسجيل طالب",
  },
  registerStudent: {
    title: "تسجيل طالب",
    manual: {
      title: "تسجيل طالب يدويًا",
    },
    upload: {
      title: "تسجيل الطلاب من ملف Excel",
      uploadExcelFile: "تحميل الملف",
      success: "تم تحميل الملف بنجاح",
      mapping: {
        title: "تعيين الأعمدة",
        instructions:
          "قم بتعيين الأعمدة في ملف Excel إلى الحقول في قاعدة البيانات",
        unset: "اختر الحقل",
        success: {
          updateField: "تم تحديث تعيين الحقل بنجاح",
          cancel: "تم إلغاء جلسة التسجيل بنجاح",
        },
        error: {
          missingFields: "الرجاء تعيين جميع الحقول",
          updateFailed: "فشل تحديث تعيين الحقل",
          cancelFailed: "فشل إلغاء جلسة التسجيل",
        },
      },
      commit: {
        title: "تأكيد التسجيل",
        success: "تم تسجيل الطلاب بنجاح",
        error: {
          commitFailed: "فشل تأكيد التسجيل",
          row: "فشل تأكيد الصف {rowNumber}",
        },
      },
    },
  },
  courses: {
    title: "المقررات",
  },
  myCourses: {
    title: "مقرراتي",
    noCourses: "لا توجد مقررات",
  },
  evaluation: {
    selectRating: "اختر التقييم",
  },
  announcements: {
    title: "الإعلانات",
    noAnnouncements: "لا توجد إعلانات",
    create: {
      title: "إنشاء إعلان",
      form: {
        title: "العنوان",
        content: "المحتوى",
        severity: "الاهمية",
        info: "معلومات",
        warning: "تحذير",
        danger: "خطر",
        departments: "الأقسام",
        levels: "المستويات",
      },
      success: "تم إنشاء الإعلان بنجاح",
      error: {
        createFailed: "فشل إنشاء الإعلان",
      },
    },
  },
  serviceRequests: {
    title: "طلبات الخدمة",
    noServiceRequests: "لا توجد طلبات خدمة",
    createServiceRequest: "إنشاء طلب خدمة",
  },
  profile: {
    title: "الملف الشخصي",
    name: "الاسم",
    email: "البريد الإلكتروني",
    update: "تحديث الملف الشخصي",
    success: "تم تحديث الملف الشخصي بنجاح",
    error: {
      updateFailed: "فشل تحديث الملف الشخصي",
    },
    updating: "جاري التحديث...",
  },
  graduation: {
    title: "إنشاء فريق مشروع التخرج",
    updateTitle: "تحديث فريق مشروع التخرج",
    projectTitle: "اسم المشروع",
    enrollments: "الطلاب",
    instructorTeachings: "الدكتور",
    assistantTeachings: "المعيد",
    selectEnrollment: "اختر طالب",
    selectInstructorTeaching: "اختر الدكتور",
    selectAssistantTeaching: "اختر المعيد",
    addEnrollment: "إضافة طالب",
    addInstructorTeaching: "إضافة الدكتور",
    addAssistantTeaching: "إضافة المعيد",
    success: "تم إنشاء الفريق بنجاح",
    updateSuccess: "تم تحديث الفريق بنجاح",
    error: {
      createFailed: "فشل إنشاء الفريق",
    },
    search: "بحث",
    showTeachingAssistants: "عرض المعيدين",
    hideTeachingAssistants: "إخفاء المعيدين",
    delete: "حذف الفريق",
    deleteSuccess: "تم حذف الفريق بنجاح",
    deleteConfirm: "هل أنت متأكد من حذف الفريق؟",
    team: "الفريق",
    supervisedBy: "يشرف عليه",
    assist: "المساعدين",
    updateTitleMini: "تحديث الفريق",
  },
  filter: {
    search: "بحث",
    department: "القسم",
    gender: "الجنس",
    level: "المستوى",
    title: "اللقب",
  },
  teachings: {
    updateGrade: "تحديث الدرجة",
    termWorkGrade: "درجة اعمال السنه",
    finalExamGrade: "درجة الامتحان النهائي",
    success: "تم تحديث الدرجة بنجاح",
    error: {
      updateFailed: "فشل تحديث الدرجة",
    },
  },
  instructorTa: {
    instructorTitle: "الدكاترة",
    assistantTitle: "المعيدين",
    name: "الاسم",
    title: "اللقب",
    email: "البريد الإلكتروني",
    officeHours: "ساعات العمل",
    office: "المكتب",
    department: "القسم",
  },
} as const;
