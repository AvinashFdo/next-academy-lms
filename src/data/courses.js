export const courses = [
  {
  id: 'academic-skills',
  title: 'Academic Skills',
  category: 'Academic Development',
  type: 'Paid',
  price: 90,
  formattedPrice: '$90',
  thumbnail: '/images/courses/academic-skills.jpg',
  lessons: 4,
  modules: 1,
  instructor: 'NEXT Academy',
  level: 'Beginner',
  duration: 'Self-paced',
  progress: 25,
  description:
    'Build essential academic skills including study strategies, academic writing, and effective learning.',
  longDescription:
    'This course helps learners strengthen core academic skills needed for successful study, including note-taking, academic writing, critical reading, and self-management.',
  outcomes: [
    'Develop effective study habits',
    'Improve academic writing skills',
    'Understand key academic success strategies',
  ],
  videoEmbedUrl: 'https://www.youtube.com/embed/ACJPDZNtzK4?si=Lr0ZX_w8Ec6QsWz-',
  videoUrl: 'https://youtu.be/ACJPDZNtzK4?si=BH_ZpEIsjsSMXL9O',
  resources: [
    {
      name: 'Academic Skills Guide.pdf',
      action: 'Open',
      url: '/files/academic-skills-guide.pdf',
      downloadUrl: '/files/academic-skills-guide.pdf',
      type: 'pdf',
    },
    
  ],
  h5pEmbedUrl: 'https://app.lumi.education/api/v1/run/CL8gRh/embed',
},
  {
    id: 'business-analytics-essentials',
    title: 'Business Analytics Essentials',
    category: 'Analytics',
    type: 'Free',
    price: 0,
    formattedPrice: 'Free',
    thumbnail: '/images/courses/business-analytics.jpg',
    lessons: 10,
    modules: 4,
    instructor: 'NEXT Academy',
    level: 'Beginner',
    duration: '4 Weeks',
    progress: 50,
    description:
      'A beginner-friendly course on business metrics, dashboards, and data-driven decision making.',
    longDescription:
      'An introductory course covering KPIs, dashboards, data interpretation, and analytics thinking for business teams.',
    outcomes: ['Understand KPIs', 'Use dashboard thinking', 'Support data-driven decisions'],
  },
  {
    id: 'project-management-basics',
    title: 'Project Management Basics',
    category: 'Management',
    type: 'Paid',
    price: 95,
    formattedPrice: '$95',
    thumbnail: '/images/courses/project-management.jpg',
    lessons: 5,
    modules: 4,
    instructor: 'NEXT Academy',
    level: 'Intermediate',
    duration: '5 Weeks',
    progress: 15,
    description:
      'Understand planning, execution, risk handling, and collaboration in modern project teams.',
    longDescription:
      'This course helps learners understand task planning, milestone tracking, collaboration, and delivery management in real projects.',
    outcomes: ['Plan project work', 'Identify risks', 'Manage delivery expectations'],
  },
  {
    id: 'ui-ux-for-business-teams',
    title: 'UI/UX for Business Teams',
    category: 'Design',
    type: 'Paid',
    price: 140,
    formattedPrice: '$140',
    thumbnail: '/images/courses/ui-ux.jpg',
    lessons: 22,
    modules: 6,
    instructor: 'NEXT Academy',
    level: 'Beginner',
    duration: '6 Weeks',
    progress: 0,
    description:
      'Learn how product thinking, UX flows, and interface design support business outcomes.',
    longDescription:
      'Explore user journeys, interface patterns, and practical product design methods that improve customer experience.',
    outcomes: ['Map user flows', 'Understand design basics', 'Collaborate better with product teams'],
  },
];

export const categories = ['All', 'Academic Development', 'Analytics', 'Management', 'Design'];

export const lessonPreview = [
  { id: 1, title: 'Introduction to Academic Skills', duration: '08:45', preview: true },
  { id: 2, title: 'Data Collection', duration: '12:10', preview: false },
  { id: 3, title: 'Academic Writing Essentials', duration: '16:25', preview: false },
  { id: 4, title: 'Interactive Practice Activity', duration: 'H5P Activity', preview: false },
];