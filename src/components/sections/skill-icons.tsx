/* eslint-disable security/detect-object-injection */
import {
  AppWindow,
  Atom,
  Box,
  Braces,
  Cloud,
  Code2,
  Coffee,
  Container,
  Cpu,
  Database,
  FileCode,
  FileJson,
  GitBranch,
  Github,
  Globe,
  Layers,
  Layout,
  Library,
  type LucideIcon,
  Monitor,
  Server,
  Settings,
  Terminal,
  Workflow,
  Wrench,
} from 'lucide-react'

export const SkillIcons: Record<string, LucideIcon> = {
  AWS: Cloud,
  Azure: Cloud,
  CSS: Layout,
  Database: Database,
  // Generic Fallbacks
  Default: Cpu,
  Docker: Container,
  GCP: Cloud,
  // Tools & Platforms
  Git: GitBranch,
  GitHub: Github,
  Go: Box,

  Gradle: Workflow,
  HTML: Code2,
  // Languages
  Java: Coffee,
  JavaScript: FileJson,
  Kubernetes: Settings,

  Linux: Terminal,
  Maven: Library,
  MongoDB: Database,
  'Next.js': AppWindow,
  Node: Server,
  PostgreSQL: Database,
  Python: Braces,
  React: Atom,
  Redis: Database,
  Rust: Settings,
  // Frameworks & Libraries
  'Spring Boot': Layers,
  SQL: Database,
  System: Monitor,

  Tailwind: Layers,
  Tool: Wrench,
  TypeScript: FileCode,
  Web: Globe,
}

// Helper to get icon with fallback
export const getSkillIcon = (skill: string): LucideIcon => {
  // Try exact match
  if (SkillIcons[skill]) {
    return SkillIcons[skill]
  }

  // Try case-insensitive match
  const lowerSkill: string = skill.toLowerCase()
  const found: string | undefined = Object.keys(SkillIcons).find(
    (key: string): boolean => key.toLowerCase() === lowerSkill
  )
  if (found !== undefined && SkillIcons[found]) {
    return SkillIcons[found]
  }

  // Heuristics
  if (lowerSkill.includes('react')) {
    return SkillIcons['React'] ?? SkillIcons['Default'] ?? Cpu
  }
  if (lowerSkill.includes('script')) {
    return SkillIcons['TypeScript'] ?? SkillIcons['Default'] ?? Cpu
  }
  if (
    lowerSkill.includes('sql') ||
    lowerSkill.includes('db') ||
    lowerSkill.includes('data')
  ) {
    return SkillIcons['Database'] ?? SkillIcons['Default'] ?? Cpu
  }
  if (lowerSkill.includes('cloud') || lowerSkill.includes('aws')) {
    return SkillIcons['AWS'] ?? SkillIcons['Default'] ?? Cpu
  }
  if (lowerSkill.includes('git')) {
    return SkillIcons['Git'] ?? SkillIcons['Default'] ?? Cpu
  }

  return SkillIcons['Default'] ?? Cpu
}
