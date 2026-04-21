export const courseContent = {
  'academic-skills': [
    {
      id: 'module-1',
      title: 'Module 1: Academic Foundations',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Introduction to Academic Skills',
          type: 'video',
          duration: '08:45',
          preview: true,
          videoEmbedUrl: 'https://www.youtube.com/embed/ACJPDZNtzK4?si=Lr0ZX_w8Ec6QsWz-',
          videoUrl: 'https://youtu.be/ACJPDZNtzK4?si=BH_ZpEIsjsSMXL9O',
        },
        {
          id: 'lesson-2',
          title: 'Academic Writing Essentials',
          type: 'resource',
          duration: '16:25',
          preview: false,
          resources: [
            {
              id: 'res-1',
              name: 'Academic Skills Guide.pdf',
              url: '/files/academic-skills-guide.pdf',
              downloadUrl: '/files/academic-skills-guide.pdf',
              type: 'pdf',
            },
          ],
        },
        {
          id: 'lesson-3',
          title: 'Interactive Practice Activity',
          type: 'h5p',
          duration: 'H5P Activity',
          preview: false,
          h5pEmbedUrl: 'https://app.lumi.education/api/v1/run/CL8gRh/embed',
        },
        {
          id: 'lesson-4',
          title: 'Getting Started Quiz',
          type: 'quiz',
          duration: '10 questions',
          preview: false,
          quizId: 'quiz-1',
        },
      ],
    },
  ],
};