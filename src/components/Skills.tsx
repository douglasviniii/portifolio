import { motion } from 'framer-motion'

interface SkillCategory {
  category: string
  skills: { name: string; level: number }[]
  color: string
}

const skillCategories: SkillCategory[] = [
  {
    category: 'Mobile',
    color: 'neon-pink',
    skills: [
      { name: 'React Native', level: 95 },
      { name: 'Expo', level: 90 },
      { name: 'React Navigation', level: 85 },
      { name: 'MMKV', level: 80 },
      { name: 'iOS/Android', level: 85 },
    ],
  },
  {
    category: 'Frontend Web',
    color: 'neon-cyan',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 90 },
      { name: 'TypeScript', level: 90 },
      { name: 'TailwindCSS', level: 90 },
      { name: 'Vite', level: 85 },
    ],
  },
  {
    category: 'Backend',
    color: 'neon-purple',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'NestJS', level: 85 },
      { name: 'Express', level: 85 },
      { name: 'TypeScript', level: 90 },
      { name: 'REST APIs', level: 90 },
    ],
  },
  {
    category: 'Data & Infrastructure',
    color: 'neon-lime',
    skills: [
      { name: 'Firebase', level: 90 },
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Redis', level: 80 },
      { name: 'Supabase', level: 80 },
    ],
  },
]

const otherSkills = [
  'XML/SOAP Integration',
  'Digital Signatures',
  'Performance Optimization',
  'State Management',
  'Event-Driven Architecture',
  'Cloud Functions',
  'Docker',
  'Git/GitHub',
  'Testing',
  'Agile/Scrum',
]

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="skills" className="py-32 relative">
      <div className="container-custom">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
            Skills & <span className="neon-text">Expertise</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and practices
          </p>
        </motion.div>

        {/* Primary Skills Categories */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {skillCategories.map((category) => (
            <motion.div
              key={category.category}
              variants={itemVariants}
              className="glass p-6 rounded-lg border border-white/10"
            >
              <h3 className="text-lg font-bold mb-6 text-white flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full" 
                  style={{
                    backgroundColor: category.color === 'neon-pink' ? '#FF006E' : 
                                    category.color === 'neon-cyan' ? '#00D9FF' :
                                    category.color === 'neon-purple' ? '#B537F2' : '#39FF14'
                  }}
                />
                {category.category}
              </h3>

              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-300">{skill.name}</span>
                      <span className="text-xs text-gray-500">{skill.level}%</span>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="h-2 rounded-full opacity-70"
                      style={{
                        background: category.color === 'neon-pink' ? 'linear-gradient(90deg, #FF006E, rgba(255, 0, 110, 0.5))' :
                                   category.color === 'neon-cyan' ? 'linear-gradient(90deg, #00D9FF, rgba(0, 217, 255, 0.5))' :
                                   category.color === 'neon-purple' ? 'linear-gradient(90deg, #B537F2, rgba(181, 55, 242, 0.5))' :
                                   'linear-gradient(90deg, #39FF14, rgba(57, 255, 20, 0.5))'
                      }}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="glass p-8 rounded-lg border border-white/10"
        >
          <h3 className="text-2xl font-bold mb-6">Other Skills & Knowledge</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherSkills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="py-3 px-4 rounded-lg border border-neon-pink/20 text-center cursor-pointer hover:border-neon-pink/50 hover:bg-neon-pink/5 transition-all"
              >
                <span className="text-sm font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learning & Interests */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 glass p-8 rounded-lg border border-neon-cyan/20 bg-gradient-to-r from-neon-cyan/5 to-transparent"
        >
          <h3 className="text-2xl font-bold mb-4 text-neon-cyan">Currently Learning</h3>
          <p className="text-gray-300 leading-relaxed">
            Always exploring new technologies and best practices. Currently diving into advanced system design patterns, AI/ML integration in mobile apps, and exploring the Web3 ecosystem. Passionate about staying at the forefront of modern development.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
