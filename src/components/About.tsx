import { motion } from 'framer-motion'
import { HiCode, HiRocket, HiLightBulb, HiZap } from 'react-icons/hi'

export default function About() {
  const strengths = [
    {
      icon: HiCode,
      title: 'Full Stack Development',
      description: 'From React Native mobile apps to NestJS backends, I build complete products with modern tech stacks.',
    },
    {
      icon: HiRocket,
      title: 'Performance First',
      description: 'I optimize every pixel and every API call. Caching, virtualization, and efficient architecture matter.',
    },
    {
      icon: HiLightBulb,
      title: 'Architecture & Design',
      description: 'Clean code, scalable systems, and thoughtful UX. I approach problems with both technical and user perspective.',
    },
    {
      icon: HiZap,
      title: 'Rapid Iteration',
      description: 'Agile mindset. I ship MVPs quickly while maintaining code quality and the ability to scale.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
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
    <section id="about" className="py-32 relative">
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
            About <span className="neon-text">Me</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A developer passionate about building high-quality, performant digital products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left side - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-lg text-gray-300 leading-relaxed">
              I'm a <span className="text-neon-pink font-bold">fullstack developer</span> with a strong focus on mobile development and modern JavaScript/TypeScript ecosystems. Over the years, I've built complete products from zero to production, managing everything from iOS/Android apps to complex backend systems.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              My expertise spans across <span className="text-neon-cyan font-bold">React Native, Next.js, Node.js, Firebase, and cloud infrastructure</span>. I have a proven track record in optimizing performance, architecting scalable systems, and delivering user-focused features that actually matter.
            </p>

            <p className="text-lg text-gray-300 leading-relaxed">
              What drives me is the challenge of solving complex technical problems while keeping the end-user experience at the forefront. I believe in writing clean, maintainable code and in building products that people love to use.
            </p>

            <div className="pt-4">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                className="btn-primary inline-block"
              >
                Let's Work Together
              </motion.a>
            </div>
          </motion.div>

          {/* Right side - Stats or visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { label: 'Projects Built', value: '20+' },
              { label: 'Years Experience', value: '4+' },
              { label: 'Technologies', value: '15+' },
              { label: 'Coffee Cups', value: '∞' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                viewport={{ once: true }}
                className="glass p-6 rounded-lg text-center border border-neon-pink/20 hover:border-neon-pink/50"
              >
                <div className="text-3xl md:text-4xl font-black text-neon-pink mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Strengths grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {strengths.map((strength) => (
            <motion.div
              key={strength.title}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass p-6 rounded-lg border border-white/10 hover:border-neon-pink/30 group"
            >
              <strength.icon className="text-4xl text-neon-pink group-hover:text-neon-cyan transition-colors mb-4" />
              <h3 className="text-lg font-bold mb-3 text-white">{strength.title}</h3>
              <p className="text-sm text-gray-400">{strength.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
