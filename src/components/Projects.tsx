import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HiExternalLink } from 'react-icons/hi'

interface ProjectsProps {
  language: 'pt' | 'en'
  colorIndex: number
  onClose: () => void
}

interface Project {
  id: string
  title: string
  description: string
  descriptionPt: string
  longDescription: string
  longDescriptionPt: string
  image: string
  tags: string[]
  github: string
  live?: string
  featured: boolean
  highlights: string[]
  highlightsPt: string[]
}

const projects: Project[] = [
  {
    id: 'diamond',
    title: 'Diamond Mobile App',
    description: 'High-performance React Native social network with real-time features',
    descriptionPt: 'Rede social em React Native de alto desempenho com recursos em tempo real',
    longDescription: 'A feature-rich mobile app with feed, communities, real-time chat, live streaming, gamification and marketplace. Optimized for performance with React Query, MMKV storage and FlashList for virtualized rendering.',
    longDescriptionPt: 'Um app mobile completo com feed, comunidades, chat em tempo real, transmissão ao vivo, gamificação e marketplace. Otimizado para desempenho com React Query, armazenamento MMKV e FlashList para renderização virtualizada.',
    image: 'diamond.png',
    tags: ['React Native', 'Expo', 'Firebase', 'React Query', 'TypeScript'],
    github: 'https://github.com/douglasviniii/mobile',
    featured: true,
    highlights: [
      'Performance-optimized caching system',
      'Real-time messaging with Firebase',
      'Virtualized lists with FlashList',
      'Gamification engine',
      'Live streaming integration',
    ],
    highlightsPt: [
      'Sistema de cache otimizado',
      'Mensagens em tempo real com Firebase',
      'Listas virtualizadas com FlashList',
      'Motor de gamificação',
      'Integração de transmissão ao vivo',
    ],
  },
  {
    id: 'aginotas',
    title: 'AgiNotas',
    description: 'National NFS-e invoice platform with full fiscal compliance',
    descriptionPt: 'Plataforma nacional de notas fiscais com total conformidade fiscal',
    longDescription: 'Enterprise-grade web platform for issuing digital invoices (NFS-e) with multi-role architecture. Features digital signature (XML-DSig), complex fiscal workflows and integration with the NFS-e ecosystem.',
    longDescriptionPt: 'Plataforma web de nível empresarial para emissão de notas fiscais eletrônicas (NFS-e) com arquitetura multi-papel. Possui assinatura digital (XML-DSig), fluxos fiscais complexos e integração com o ecossistema NFS-e.',
    image: 'aginotas.png',
    tags: ['Next.js', 'Firebase', 'XML/Cryptography', 'React', 'TypeScript'],
    github: 'https://github.com/douglasviniii/Aginotas',
    featured: true,
    highlights: [
      'Digital invoice generation',
      'XML signing (XMLDSIG)',
      'Multi-role access control',
      'Fiscal compliance automation',
      'Admin dashboard',
    ],
    highlightsPt: [
      'Geração de notas fiscais digitais',
      'Assinatura XML (XMLDSIG)',
      'Controle de acesso multi-papel',
      'Automação de conformidade fiscal',
      'Painel administrativo',
    ],
  },
  {
    id: 'roxinho',
    title: 'Roxinho',
    description: 'Mobility platform with passenger and driver apps + dispatch API',
    descriptionPt: 'Plataforma de mobilidade com apps de passageiro e motorista + API de despacho',
    longDescription: 'Complete ride-sharing ecosystem with separate apps for passengers and drivers. Features real-time dispatch engine, in-app messaging, and dual platform support (mobile + web).',
    longDescriptionPt: 'Ecossistema completo de compartilhamento de caronas com apps separados para passageiros e motoristas. Possui mecanismo de despacho em tempo real, mensagens no app e suporte de plataforma dual (mobile + web).',
    image: 'roxinho.png',
    tags: ['React Native', 'Expo', 'Firebase', 'Python', 'TypeScript'],
    github: 'https://github.com/douglasviniii/roxinho',
    live: 'https://rooxinho.com.br',
    featured: true,
    highlights: [
      'Real-time ride dispatch',
      'Dual app architecture',
      'Python dispatch engine',
      'Web export capability',
      'Role-based access',
    ],
    highlightsPt: [
      'Despacho de caronas em tempo real',
      'Arquitetura dual de app',
      'Motor de despacho Python',
      'Capacidade de exportação web',
      'Acesso baseado em funções',
    ],
  },
  {
    id: 'delfos',
    title: 'Delfos',
    description: 'Admin dashboard with scheduled tasks and PDF export',
    descriptionPt: 'Painel administrativo com tarefas agendadas e exportação PDF',
    longDescription: 'Full-featured admin platform built with Next.js and Firebase. Includes task scheduling, PDF/CSV export capabilities, and a Python-based scheduler for async operations.',
    longDescriptionPt: 'Plataforma admin completa construída com Next.js e Firebase. Inclui agendamento de tarefas, capacidades de exportação PDF/CSV e um scheduler baseado em Python para operações assíncronas.',
    image: 'delfos.png',
    tags: ['Next.js', 'Firebase', 'Cloud Functions', 'Python', 'TailwindCSS'],
    github: 'https://github.com/douglasviniii/delfos',
    live: 'https://delfoscontabilidade.com.br',
    featured: false,
    highlights: [
      'Task scheduling system',
      'PDF/CSV exports',
      'Cloud Functions',
      'Real-time updates',
      'Document generation',
    ],
    highlightsPt: [
      'Sistema de agendamento de tarefas',
      'Exportação PDF/CSV',
      'Cloud Functions',
      'Atualizações em tempo real',
      'Geração de documentos',
    ],
  },
  {
    id: 'api-aginotas',
    title: 'API AgiNotas',
    description: 'Robust NestJS backend with async jobs and complex integrations',
    descriptionPt: 'Backend robusto em NestJS com tarefas assíncronas e integrações complexas',
    longDescription: 'Production-grade API built with NestJS featuring job queues with Bull, Redis caching, MongoDB persistence, and comprehensive Swagger documentation. Handles complex invoice workflows and integrations.',
    longDescriptionPt: 'API de nível produção construída com NestJS com filas de trabalho Bull, cache Redis, persistência MongoDB e documentação abrangente com Swagger. Manipula fluxos de notas fiscais e integrações complexas.',
    image: 'api.png',
    tags: ['NestJS', 'Bull/Redis', 'MongoDB', 'TypeScript', 'Swagger'],
    github: 'https://github.com/douglasviniii/api-aginotas',
    featured: false,
    highlights: [
      'Job queues with Bull',
      'Redis caching',
      'MongoDB persistence',
      'JWT authentication',
      'Swagger docs',
    ],
    highlightsPt: [
      'Filas de trabalho com Bull',
      'Cache Redis',
      'Persistência MongoDB',
      'Autenticação JWT',
      'Documentação Swagger',
    ],
  },
  {
    id: 'painel-delvind',
    title: 'Painel Delvind',
    description: 'Analytics dashboard with charts, editor, and multi-role backend',
    descriptionPt: 'Painel analytics com gráficos, editor e backend multi-papel',
    longDescription: 'Complete dashboard solution with React frontend and Express backend. Includes real-time analytics, data visualization with Chart.js, Monaco editor integration, and comprehensive permission system.',
    longDescriptionPt: 'Solução completa de painel com frontend React e backend Express. Inclui analytics em tempo real, visualização de dados com Chart.js, integração com editor Monaco e sistema abrangente de permissões.',
    image: 'painel.png',
    tags: ['React', 'Vite', 'Express', 'MongoDB', 'Chart.js'],
    github: 'https://github.com/douglasviniii/painel-delvind-frontend',
    featured: false,
    highlights: [
      'Real-time analytics',
      'Data visualization',
      'Monaco editor',
      'Multi-role system',
      'PDF reports',
    ],
    highlightsPt: [
      'Analytics em tempo real',
      'Visualização de dados',
      'Editor Monaco',
      'Sistema multi-papel',
      'Relatórios PDF',
    ],
  },
  {
    id: 'flipple-arcade',
    title: 'Flipple Arcade',
    description: 'Gaming streaming platform and community for mobile gamers',
    descriptionPt: 'Plataforma de streaming de games e comunidade para jogadores mobile',
    longDescription: 'A revolutionary streaming platform for mobile gamers where users can broadcast their gameplay, create communities, and monetize their content. Features include live studio with PC support, selfie live streaming, audio chat, and integrated payment system.',
    longDescriptionPt: 'Uma plataforma revolucionária de streaming para jogadores mobile onde os usuários podem transmitir suas partidas, criar comunidades e monetizar conteúdo. Inclui estúdio de transmissão com suporte a PC, transmissão ao vivo por selfie, chat com áudio e sistema de pagamento integrado.',
    image: 'flipple.png',
    tags: ['React Native', 'Next.js', 'Firebase', 'Expo', 'Node.js'],
    github: 'https://github.com/delvind',
    live: 'https://flipplearcade.com',
    featured: true,
    highlights: [
      'Live streaming with multiple camera layouts',
      'Community & audience monetization',
      'Mobile-first gaming focus',
      'Real-time Drix currency system',
      'Cross-platform streaming',
    ],
    highlightsPt: [
      'Transmissão ao vivo com layouts múltiplos',
      'Monetização de comunidade',
      'Foco em jogos mobile',
      'Sistema de moeda Drix em tempo real',
      'Transmissão multiplataforma',
    ],
  },
  {
    id: 'delvify',
    title: 'DelviFy',
    description: 'Multi-tenant online course platform with AI personalization',
    descriptionPt: 'Plataforma multi-inquilino de cursos online com personalização por IA',
    longDescription: 'A comprehensive multi-tenant platform for creating and selling online courses. Features AI-powered branding customization, separate admin panels for each tenant, integrated blog engine, secure authentication, and payment processing for course creators.',
    longDescriptionPt: 'Uma plataforma multi-inquilino abrangente para criar e vender cursos online. Oferece personalização de marca com IA, painéis de administração separados para cada inquilino, motor de blog integrado, autenticação segura e processamento de pagamentos.',
    image: 'delvify.png',
    tags: ['Next.js', 'React', 'Node.js', 'MongoDB', 'AI/GenAI'],
    github: 'https://github.com/delvind',
    live: 'https://delvify.delvind.com',
    featured: true,
    highlights: [
      'AI-powered branding system',
      'Multi-tenant architecture',
      'Integrated blog platform',
      'Secure user authentication',
      'Course monetization system',
    ],
    highlightsPt: [
      'Sistema de marca com IA',
      'Arquitetura multi-inquilino',
      'Plataforma de blog integrada',
      'Autenticação segura de usuários',
      'Sistema de monetização de cursos',
    ],
  },
  {
    id: 'delvind-website',
    title: 'Delvind Digital Agency',
    description: 'Digital positioning agency website and portfolio',
    descriptionPt: 'Website de agência de posicionamento digital e portfólio',
    longDescription: 'The official Delvind website showcasing their digital services including web development, SEO optimization, mobile app development, and digital positioning. Features a comprehensive services portfolio and client showcase.',
    longDescriptionPt: 'O website oficial da Delvind mostrando seus serviços digitais incluindo desenvolvimento web, otimização SEO, desenvolvimento de aplicativos mobile e posicionamento digital. Apresenta um portfólio completo de serviços e apresentação de clientes.',
    image: 'delvind.png',
    tags: ['Next.js', 'React', 'TailwindCSS', 'TypeScript', 'SEO'],
    github: 'https://github.com/delvind',
    live: 'https://www.delvind.com',
    featured: true,
    highlights: [
      'Professional services showcase',
      'Client portfolio display',
      'SEO-optimized website',
      'Responsive design',
      'Blog & content management',
    ],
    highlightsPt: [
      'Apresentação profissional de serviços',
      'Exibição de portfólio de clientes',
      'Website otimizado para SEO',
      'Design responsivo',
      'Blog e gestão de conteúdo',
    ],
  },
  {
    id: 'evoluglass',
    title: 'Evoluglass',
    description: 'E-commerce platform for laminated and monolithic glass products',
    descriptionPt: 'Plataforma e-commerce para produtos de vidro laminado e monolítico',
    longDescription: 'A modern e-commerce website for Evoluglass, a leading glass supplier in Brazil. Features product catalog, logistics information, company mission showcase, and customer contact system for glass procurement across the nation.',
    longDescriptionPt: 'Um website e-commerce moderno para a Evoluglass, fornecedora líder de vidros no Brasil. Apresenta catálogo de produtos, informações de logística, apresentação da missão da empresa e sistema de contato para encomendas de vidros em todo o país.',
    image: 'evoluglass.png',
    tags: ['Website', 'E-commerce', 'TailwindCSS', 'Responsive Design', 'SEO'],
    github: 'https://github.com/delvind',
    live: 'https://evoluglass.com.br',
    featured: false,
    highlights: [
      'Product catalog management',
      'Responsive e-commerce design',
      'Company brand showcase',
      'Customer contact system',
      'National logistics presentation',
    ],
    highlightsPt: [
      'Gestão de catálogo de produtos',
      'Design e-commerce responsivo',
      'Apresentação de marca',
      'Sistema de contato com clientes',
      'Apresentação de logística nacional',
    ],
  },
  {
    id: 'evoluacao',
    title: 'Evoluação',
    description: 'Industrial wires and galvanized materials manufacturer website',
    descriptionPt: 'Website de fabricante de arames e materiais galvanizados',
    longDescription: 'Online presence for Evoluação, a 15+ year established manufacturer of galvanized wires and industrial materials. Features product catalog, logistics fleet information, company history, and B2B contact system for industrial procurement.',
    longDescriptionPt: 'Presença online da Evoluação, fabricante estabelecida por mais de 15 anos de arames galvanizados e materiais industriais. Apresenta catálogo de produtos, informações de frota logística, história da empresa e sistema de contato B2B.',
    image: 'evoluacao.png',
    tags: ['Website', 'B2B Commerce', 'TailwindCSS', 'Product Catalog', 'Responsive Design'],
    github: 'https://github.com/delvind',
    live: 'https://www.evoluaco.com.br',
    featured: false,
    highlights: [
      '15+ years of industry experience',
      'B2B product catalog',
      'Fleet logistics showcase',
      'Personalized industrial solutions',
      'Technical product information',
    ],
    highlightsPt: [
      'Mais de 15 anos de experiência',
      'Catálogo B2B',
      'Apresentação de frota logística',
      'Soluções industriais personalizadas',
      'Informações técnicas de produtos',
    ],
  },
  {
    id: 'companhia-sol',
    title: 'Companhia Sol - Solgas',
    description: 'Gas distribution service website with fast delivery system',
    descriptionPt: 'Website de serviço de distribuição de gás com sistema rápido de entrega',
    longDescription: 'Modern e-commerce platform for gas distribution services. Features quick order system with 10-minute delivery, customer testimonials, service options, and integrated payment processing for residential and commercial gas clients.',
    longDescriptionPt: 'Plataforma e-commerce moderna para serviços de distribuição de gás. Oferece sistema de pedidos rápido com entrega em até 10 minutos, depoimentos de clientes, opções de serviço e processamento de pagamentos integrado.',
    image: 'solgas.png',
    tags: ['E-commerce', 'Payment Integration', 'Fast Delivery', 'React', 'TailwindCSS'],
    github: 'https://github.com/delvind',
    live: 'https://companhiasol.com.br',
    featured: false,
    highlights: [
      'Fast 10-minute delivery system',
      'Easy order checkout',
      'Customer testimonials',
      'Multiple service options',
      'Quality assurance focus',
    ],
    highlightsPt: [
      'Sistema de entrega rápida (10 min)',
      'Checkout simplificado',
      'Depoimentos de clientes',
      'Múltiplas opções de serviço',
      'Foco em qualidade',
    ],
  },
  {
    id: 'lucas-imports',
    title: 'Lucas Imports Cell',
    description: 'Mobile phone accessories e-commerce and electronics store',
    descriptionPt: 'E-commerce de acessórios de celular e loja de eletrônicos',
    longDescription: 'E-commerce platform for Lucas Imports Cell, a premium mobile accessories and electronics store in Alenquer. Features product showcase, client reviews, service information, and WhatsApp integration for customer support and sales.',
    longDescriptionPt: 'Plataforma e-commerce para Lucas Imports Cell, loja premium de acessórios mobile e eletrônicos em Alenquer. Apresenta vitrine de produtos, avaliações de clientes, informações de serviço e integração WhatsApp para suporte.',
    image: 'lucas.png',
    tags: ['E-commerce', 'Product Showcase', 'WhatsApp Integration', 'Mobile', 'React'],
    github: 'https://github.com/delvind',
    live: 'https://lucasimportscell.com',
    featured: false,
    highlights: [
      'Premium electronics catalog',
      'Customer reviews showcase',
      'WhatsApp support integration',
      'Multiple brand partnerships',
      'Fast city delivery',
    ],
    highlightsPt: [
      'Catálogo premium de eletrônicos',
      'Exibição de avaliações de clientes',
      'Integração WhatsApp',
      'Parcerias com múltiplas marcas',
      'Entrega rápida na cidade',
    ],
  },
  {
    id: 'paulinha-cases',
    title: 'Paulinha Cases',
    description: 'Mobile accessories store with quality guarantee program',
    descriptionPt: 'Loja de acessórios mobile com programa de garantia de qualidade',
    longDescription: 'Premium e-commerce platform for Paulinha Cases, a mobile accessories and electronics retailer in São Gabriel da Cachoeira. Showcases quality products, customer satisfaction testimonials, service hours, and integrated WhatsApp support for inquiries.',
    longDescriptionPt: 'Plataforma e-commerce premium para Paulinha Cases, varejista de acessórios mobile e eletrônicos em São Gabriel da Cachoeira. Apresenta produtos de qualidade, depoimentos de satisfação, horários de atendimento e suporte WhatsApp integrado.',
    image: 'paulinha.png',
    tags: ['E-commerce', 'Quality Assurance', 'Customer Support', 'React', 'TailwindCSS'],
    github: 'https://github.com/delvind',
    live: 'https://paulinhacases.com.br',
    featured: false,
    highlights: [
      'Original product guarantee',
      'Premium accessories catalog',
      'Customer satisfaction focus',
      'WhatsApp support channel',
      'Fast local service',
    ],
    highlightsPt: [
      'Garantia de produtos originais',
      'Catálogo de acessórios premium',
      'Foco em satisfação do cliente',
      'Canal de suporte WhatsApp',
      'Atendimento local rápido',
    ],
  },
  {
    id: 'pdv-delvind',
    title: 'PDV Delvind (Venda Fácil)',
    description: 'Cloud-based Point of Sale system for retail management',
    descriptionPt: 'Sistema de Ponto de Venda em nuvem para gestão de varejo',
    longDescription: 'Complete cloud-based POS system for retail businesses. Features fast sales interface, inventory control, cash management, financial flow dashboard, intelligent reports, and priority WhatsApp support. Includes 7-day free trial.',
    longDescriptionPt: 'Sistema POS completo baseado em nuvem para negócios varejistas. Oferece interface rápida de vendas, controle de estoque, gestão de caixa, painel de fluxo financeiro, relatórios inteligentes e suporte prioritário via WhatsApp. Inclui teste grátis de 7 dias.',
    image: 'pdv.png',
    tags: ['SaaS', 'Cloud Computing', 'Next.js', 'Node.js', 'Dashboard'],
    github: 'https://github.com/delvind',
    live: 'https://pdv.delvind.com/home',
    featured: false,
    highlights: [
      'Unlimited team users',
      'Real-time inventory control',
      'Cloud-based accessibility',
      'Intelligent financial reports',
      'Priority WhatsApp support',
    ],
    highlightsPt: [
      'Usuários ilimitados na equipe',
      'Controle de estoque em tempo real',
      'Acessibilidade em nuvem',
      'Relatórios financeiros inteligentes',
      'Suporte prioritário via WhatsApp',
    ],
  },
]

// Wormhole effect component
const WormholeEffect = ({ colorIndex, isVisible }: { colorIndex: number; isVisible: boolean }) => {
  const colors = [
    'from-gray-600 to-gray-400',
    'from-pink-500 to-blue-500',
    'from-purple-500 to-cyan-500',
    'from-indigo-500 to-green-500',
    'from-red-500 to-orange-500',
    'from-yellow-500 to-pink-500',
    'from-green-500 to-blue-500',
    'from-cyan-500 to-purple-500',
    'from-orange-500 to-red-500',
    'from-blue-500 to-purple-500',
    'from-violet-500 to-cyan-500',
  ]

  const currentColor = colors[colorIndex] || colors[0]

  if (!isVisible) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Outer rings */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`ring-${i}`}
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 2, rotate: 360 }}
          exit={{ scale: 0 }}
          transition={{
            duration: 1.5 + i * 0.3,
            repeat: Infinity,
            ease: 'linear',
          }}
          className={`absolute rounded-full border-2 bg-gradient-to-r ${currentColor} opacity-30`}
          style={{
            width: `${100 + i * 80}px`,
            height: `${100 + i * 80}px`,
          }}
        />
      ))}

      {/* Center vortex */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative w-32 h-32 rounded-full bg-gradient-to-r ${currentColor} blur-xl opacity-50`}
      />
    </div>
  )
}

export default function Projects({ language, colorIndex, onClose }: ProjectsProps) {
  const [isWormholeVisible, setIsWormholeVisible] = useState(true)
  
  const colors = [
    'from-gray-600 to-gray-400',
    'from-pink-500 to-blue-500',
    'from-purple-500 to-cyan-500',
    'from-indigo-500 to-green-500',
    'from-red-500 to-orange-500',
    'from-yellow-500 to-pink-500',
    'from-green-500 to-blue-500',
    'from-cyan-500 to-purple-500',
    'from-orange-500 to-red-500',
    'from-blue-500 to-purple-500',
    'from-violet-500 to-cyan-500',
  ]

  const currentColor = colors[colorIndex] || colors[0]
  const allProjects = projects.filter((p) => p.featured).concat(projects.filter((p) => !p.featured))

  const labels = {
    pt: { title: 'Meus Projetos', close: 'Voltar', viewCode: 'Código', viewLive: 'Ver' },
    en: { title: 'My Projects', close: 'Back', viewCode: 'Code', viewLive: 'Live' },
  }
  const label = labels[language]

  // Hide wormhole after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWormholeVisible(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {/* Wormhole entrance */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-gray-100 z-40"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
        >
          <WormholeEffect colorIndex={colorIndex} isVisible={isWormholeVisible} />
        </motion.div>

        {/* Projects content - Timeline vertical */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="fixed inset-0 w-full flex flex-col items-center justify-start p-4 z-50 pointer-events-auto overflow-y-auto pt-20 pb-20"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl md:text-5xl lg:text-6xl font-black mb-10 md:mb-20 text-gray-950"
          >
            {label.title}
          </motion.h1>

          {/* Timeline container */}
          <div className="relative w-full max-w-5xl">
            {/* Left line on mobile, center line on desktop */}
            <div className={`absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 md:w-1 md:-translate-x-1/2 bg-gradient-to-b ${currentColor} z-0 opacity-80`} />

            {/* Projects timeline */}
            <div className="space-y-12">
              {allProjects.map((project, index) => {
                const isLeft = index % 2 === 0
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                    className={`relative z-10 pl-8 md:pl-0 md:${isLeft ? 'mr-auto pr-12 w-1/2' : 'ml-auto pl-12 w-1/2'} w-full`}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute top-5 w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r ${currentColor} z-20 left-0.5 md:left-auto ${isLeft ? 'md:-right-8' : 'md:-left-8'}`} />

                    {/* Project card */}
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="p-3 md:p-5 rounded-lg border border-gray-400 hover:border-gray-600 transition-all bg-white/80 backdrop-blur"
                    >
                      {/* Badge */}
                      {project.featured && (
                        <div className="mb-3">
                          <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${currentColor}`}>
                            Featured
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-sm md:text-lg font-bold mb-1 md:mb-2 text-gray-950">
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-700 text-xs mb-2 md:mb-3 leading-relaxed line-clamp-3">
                        {language === 'pt' ? project.longDescriptionPt : project.longDescription}
                      </p>

                      {/* Highlights */}
                      <ul className="hidden md:block text-xs text-gray-700 mb-3 space-y-1">
                        {(language === 'pt' ? project.highlightsPt : project.highlights).slice(0, 2).map((h) => (
                          <li key={h}>▸ {h}</li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 text-xs bg-gray-300 text-gray-900 rounded border border-gray-400">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links */}
                      <div className="flex gap-2 pt-3 border-t border-gray-300">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`flex-1 text-center px-3 py-2 rounded text-xs font-semibold transition-all ${
                            colorIndex === 0
                              ? 'bg-gray-800 text-white hover:bg-gray-700'
                              : `bg-gradient-to-r ${currentColor} text-white hover:shadow-lg`
                          }`}
                        >
                          {label.viewCode}
                        </a>
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={`flex-1 text-center px-3 py-2 rounded text-xs font-semibold transition-all ${
                              colorIndex === 0
                                ? 'bg-gray-800 text-white hover:bg-gray-700'
                                : `bg-gradient-to-r ${currentColor} text-white hover:shadow-lg`
                            }`}
                          >
                            {label.viewLive}
                          </a>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-20 px-8 py-3 font-semibold rounded-lg transition-all ${
              colorIndex === 0
                ? 'bg-gray-800 text-white hover:bg-gray-700'
                : `bg-gradient-to-r ${currentColor} text-white hover:shadow-lg`
            }`}
          >
            {label.close}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
