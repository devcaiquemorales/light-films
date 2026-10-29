// Types
export type Project = {
  title: string;
  slug: string;
  image: string;
  description: string[];
  photos: { path: string; alt: string }[];
};

// Data
// TODO(cliente): descrições em lorem ipsum até o cliente enviar os textos reais
export const ProjectsData: Project[] = [
  // {
  //   title: "Atelie",
  //   slug: "atelie",
  //   image: "/atelie.png",
  //   description: [
  //     "Neste projeto, nossa equipe teve a oportunidade de realçar a beleza e a funcionalidade do ateliê de costura.",
  //     "Por meio da aplicação cuidadosa de insulfilm nas portas de vidro de entrada, conseguimos criar um ambiente que combina elegância e privacidade.",
  //     "Agora, os clientes podem entrar em um espaço que oferece uma dose perfeita de luz natural, sem comprometer a confidencialidade.",
  //   ],
  //   photos: [
  //     { path: "/projects/atelie/front-1.jpg", alt: "Visão frontal 1" },
  //     { path: "/projects/atelie/front-1-1.jpg", alt: "Visão frontal 2" },
  //     { path: "/projects/atelie/front-3.jpg", alt: "Visão frontal 3" },
  //     { path: "/projects/atelie/inside-1.jpg", alt: "Visão interna 1" },
  //     { path: "/projects/atelie/inside-2.jpg", alt: "Visão interna 2" },
  //     { path: "/projects/atelie/inside-3.jpg", alt: "Visão interna 3" },
  //   ],
  // },
  {
    title: "Senai",
    slug: "senai",
    image: "/projects/senai/senai-1-1.jpg",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    photos: [
      { path: "/projects/senai/senai-1-1.jpg", alt: "Senai - foto 1" },
      { path: "/projects/senai/senai-2-2.jpg", alt: "Senai - foto 2" },
      { path: "/projects/senai/senai-3-3.jpg", alt: "Senai - foto 3" },
      { path: "/projects/senai/senai-4-4.jpg", alt: "Senai - foto 4" },
      { path: "/projects/senai/senai-5-5.jpg", alt: "Senai - foto 5" },
      { path: "/projects/senai/senai-6-6.jpg", alt: "Senai - foto 6" },
      { path: "/projects/senai/senai-7-7.jpg", alt: "Senai - foto 7" },
      { path: "/projects/senai/senai-8-8.jpg", alt: "Senai - foto 8" },
      { path: "/projects/senai/senai-9-9.jpg", alt: "Senai - foto 9" },
      { path: "/projects/senai/senai-10-10.jpg", alt: "Senai - foto 10" },
      { path: "/projects/senai/senai-11-11.jpg", alt: "Senai - foto 11" },
      { path: "/projects/senai/senai-12-12.jpg", alt: "Senai - foto 12" },
    ],
  },
  {
    title: "Sabesp",
    slug: "sabesp",
    image: "/projects/sabesp/sabesp-1-1.jpg",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    photos: [
      {
        path: "/projects/sabesp/sabesp-1-1.jpg",
        alt: "Sabesp - foto 1",
      },
      {
        path: "/projects/sabesp/sabesp-2-2.jpg",
        alt: "Sabesp - foto 2",
      },
      {
        path: "/projects/sabesp/sabesp-3-3.jpg",
        alt: "Sabesp - foto 3",
      },
      {
        path: "/projects/sabesp/sabesp-4-4.jpg",
        alt: "Sabesp - foto 4",
      },
      {
        path: "/projects/sabesp/sabesp-5-5.jpg",
        alt: "Sabesp - foto 5",
      },
      {
        path: "/projects/sabesp/sabesp-6-6.jpg",
        alt: "Sabesp - foto 6",
      },
      {
        path: "/projects/sabesp/sabesp-7-7.jpg",
        alt: "Sabesp - foto 7",
      },
      {
        path: "/projects/sabesp/sabesp-8-8.jpg",
        alt: "Sabesp - foto 8",
      },
    ],
  },
  // Porto Seguro
  {
    title: "Porto Seguro",
    slug: "porto-seguro",
    image: "/projects/porto-seguro/porto-1.jpg",
    description: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    ],
    photos: [
      {
        path: "/projects/porto-seguro/porto-1.jpg",
        alt: "Porto Seguro - foto 1",
      },
      {
        path: "/projects/porto-seguro/porto-2.jpg",
        alt: "Porto Seguro - foto 2",
      },
      {
        path: "/projects/porto-seguro/porto-3.jpg",
        alt: "Porto Seguro - foto 3",
      },
      {
        path: "/projects/porto-seguro/porto-4.jpg",
        alt: "Porto Seguro - foto 4",
      },
      {
        path: "/projects/porto-seguro/porto-5.jpg",
        alt: "Porto Seguro - foto 5",
      },
      {
        path: "/projects/porto-seguro/porto-6.jpg",
        alt: "Porto Seguro - foto 6",
      },
      {
        path: "/projects/porto-seguro/porto-7.jpg",
        alt: "Porto Seguro - foto 7",
      },
      {
        path: "/projects/porto-seguro/porto-8.jpg",
        alt: "Porto Seguro - foto 8",
      },
      {
        path: "/projects/porto-seguro/porto-9.jpg",
        alt: "Porto Seguro - foto 9",
      },
    ],
  },
  // Lacerda
  // {
  //   title: "Lacerda",
  //   slug: "lacerda",
  //   image: "/projects/lacerda/showcase.jpg",
  //   description: [
  //     "Neste projeto, nossa equipe teve a oportunidade de realçar a beleza e a funcionalidade do ateliê de costura.",
  //     "Por meio da aplicação cuidadosa de insulfilm nas portas de vidro de entrada, conseguimos criar um ambiente que combina elegância e privacidade.",
  //     "Agora, os clientes podem entrar em um espaço que oferece uma dose perfeita de luz natural, sem comprometer a confidencialidade.",
  //   ],
  //   photos: [
  //     { path: "/projects/lacerda/front-1.jpg", alt: "Visão frontal 1" },
  //     { path: "/projects/lacerda/front-2.jpg", alt: "Visão frontal 2" },
  //     {
  //       path: "/projects/lacerda/outside-view-1.jpg",
  //       alt: "Visão para fora 1",
  //     },
  //     { path: "/projects/lacerda/inside-1.jpg", alt: "Visão interna 1" },
  //     { path: "/projects/lacerda/inside-2.jpg", alt: "Visão interna 2" },
  //   ],
  // },
  // Riachuelo
  // {
  //   title: "Riachuelo",
  //   slug: "riachuelo",
  //   image: "/riachuelo.png",
  //   description: [
  //     "Nossa equipe teve a honra de contribuir para a experiência visual excepcional da famosa loja de roupas. Ao aplicar insulfilm nos vidros de entrada, conseguimos manter a transparência que caracteriza essa loja icônica, enquanto acrescentamos um toque de exclusividade e proteção.",
  //     "O insulfilm escolhido não apenas resguarda a loja da intensidade solar e dos raios UV, mas também acentua a fachada elegante e moderna.",
  //     "Agora, os clientes são recebidos por um ambiente que reflete a estética da marca e convida a uma experiência de compras sofisticada.",
  //   ],
  //   photos: [
  //     { path: "/projects/riachuelo/front-1.jpg", alt: "Visão frontal 1" },
  //     { path: "/projects/riachuelo/front-2.jpg", alt: "Visão frontal 2" },
  //     { path: "/projects/riachuelo/inside-1.jpg", alt: "Visão interna 1" },
  //     { path: "/projects/riachuelo/inside-2.jpg", alt: "Visão interna 2" },
  //     { path: "/projects/riachuelo/inside-3.jpg", alt: "Visão interna 3" },
  //   ],
  // },
];
