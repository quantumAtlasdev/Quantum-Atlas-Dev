import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
  },
  editor: lexicalEditor({}),
  collections: [
    // Users (for admin access)
    {
      slug: 'users',
      auth: true,
      fields: [],
    },
    // Media
    {
      slug: 'media',
      upload: true,
      fields: [
        { name: 'alt', type: 'text', required: true },
      ],
    },
    // Team Members
    {
      slug: 'team-members',
      admin: { useAsTitle: 'name' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'role', type: 'text' },
        { name: 'bio', type: 'richText' },
        { name: 'photo', type: 'upload', relationTo: 'media' },
        { name: 'order', type: 'number' },
      ],
    },
    // Services
    {
      slug: 'services',
      admin: { useAsTitle: 'name' },
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'slug', type: 'text', unique: true },
        {
          name: 'color',
          type: 'select',
          options: [
            { label: 'Blue', value: 'blue' },
            { label: 'Green', value: 'green' },
            { label: 'Purple', value: 'purple' },
          ],
        },
        { name: 'tagline', type: 'text' },
        { name: 'description', type: 'richText' },
        { name: 'keyMetric', type: 'text' },
        {
          name: 'proofPoints',
          type: 'array',
          fields: [{ name: 'point', type: 'text' }],
        },
        { name: 'order', type: 'number' },
      ],
    },
    // Blog Posts
    {
      slug: 'blog-posts',
      versions: { drafts: true },
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', unique: true, required: true },
        { name: 'excerpt', type: 'textarea', required: true },
        { name: 'content', type: 'richText' },
        {
          name: 'category',
          type: 'select',
          required: true,
          options: [
            { label: 'Technical Deep Dive', value: 'technical-deep-dive' },
            { label: 'AI Implementation', value: 'ai-implementation' },
            { label: 'Industry Guide', value: 'industry-guide' },
            { label: 'Case Study', value: 'case-study' },
            { label: 'Company', value: 'company' },
          ],
        },
        { name: 'author', type: 'relationship', relationTo: 'team-members' },
        { name: 'featuredImage', type: 'upload', relationTo: 'media' },
        { name: 'publishedDate', type: 'date' },
        { name: 'readTime', type: 'number' },
        {
          name: 'tags',
          type: 'array',
          fields: [{ name: 'tag', type: 'text' }],
        },
        {
          name: 'relatedPosts',
          type: 'relationship',
          relationTo: 'blog-posts',
          hasMany: true,
        },
        { name: 'featured', type: 'checkbox', defaultValue: false },
        {
          name: 'seo',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
            { name: 'ogImage', type: 'upload', relationTo: 'media' },
          ],
        },
      ],
    },
    // Whitepapers
    {
      slug: 'whitepapers',
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
        { name: 'coverImage', type: 'upload', relationTo: 'media' },
        { name: 'file', type: 'upload', relationTo: 'media' },
        {
          name: 'category',
          type: 'select',
          options: [
            { label: 'Technical', value: 'technical' },
            { label: 'ROI Analysis', value: 'roi-analysis' },
            { label: 'Implementation', value: 'implementation' },
            { label: 'Industry Guide', value: 'industry-guide' },
            { label: 'Compliance', value: 'compliance' },
          ],
        },
        {
          name: 'service',
          type: 'select',
          options: [
            { label: 'Voice AI', value: 'voice-ai' },
            { label: 'Document Intelligence', value: 'idp' },
            { label: 'Enterprise RAG', value: 'rag' },
            { label: 'Custom SaaS', value: 'saas' },
            { label: 'Automation', value: 'automation' },
            { label: 'Content & Video', value: 'content' },
          ],
        },
        {
          name: 'downloadCount',
          type: 'number',
          defaultValue: 0,
          admin: { readOnly: true },
        },
        { name: 'publishedDate', type: 'date' },
        { name: 'gated', type: 'checkbox', defaultValue: true },
      ],
    },
    // Case Studies
    {
      slug: 'case-studies',
      versions: { drafts: true },
      admin: { useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'slug', type: 'text', unique: true, required: true },
        { name: 'client', type: 'text' },
        { name: 'clientApproved', type: 'checkbox', defaultValue: false },
        {
          name: 'service',
          type: 'select',
          hasMany: true,
          options: [
            { label: 'Voice AI', value: 'voice-ai' },
            { label: 'Document Intelligence', value: 'idp' },
            { label: 'Enterprise RAG', value: 'rag' },
            { label: 'Custom SaaS', value: 'saas' },
            { label: 'Automation', value: 'automation' },
          ],
        },
        {
          name: 'industry',
          type: 'select',
          options: [
            { label: 'Government', value: 'government' },
            { label: 'Logistics', value: 'logistics' },
            { label: 'Fintech/BFSI', value: 'fintech' },
            { label: 'Legal', value: 'legal' },
            { label: 'Manufacturing', value: 'manufacturing' },
            { label: 'Healthcare', value: 'healthcare' },
            { label: 'Real Estate', value: 'real-estate' },
          ],
        },
        { name: 'challenge', type: 'richText' },
        { name: 'solution', type: 'richText' },
        {
          name: 'outcomes',
          type: 'array',
          fields: [
            { name: 'metric', type: 'text' },
            { name: 'before', type: 'text' },
            { name: 'after', type: 'text' },
          ],
        },
        {
          name: 'techStack',
          type: 'array',
          fields: [{ name: 'technology', type: 'text' }],
        },
        { name: 'featuredImage', type: 'upload', relationTo: 'media' },
        { name: 'featured', type: 'checkbox', defaultValue: false },
        {
          name: 'seo',
          type: 'group',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'description', type: 'textarea' },
          ],
        },
      ],
    },
    // Inquiries
    {
      slug: 'inquiries',
      admin: { useAsTitle: 'email' },
      fields: [
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Discovery Call', value: 'discovery-call' },
            { label: 'Whitepaper', value: 'whitepaper' },
            { label: 'General', value: 'general' },
            { label: 'ROI Calculator', value: 'roi-calculator' },
          ],
        },
        { name: 'name', type: 'text' },
        { name: 'email', type: 'email', required: true },
        { name: 'company', type: 'text' },
        { name: 'phone', type: 'text' },
        {
          name: 'service',
          type: 'select',
          options: [
            { label: 'Voice AI', value: 'voice-ai' },
            { label: 'Document Intelligence', value: 'idp' },
            { label: 'Enterprise RAG', value: 'rag' },
            { label: 'Custom SaaS', value: 'saas' },
            { label: 'Automation', value: 'automation' },
            { label: 'Content & Video', value: 'content' },
            { label: 'Not Sure', value: 'unsure' },
          ],
        },
        { name: 'message', type: 'textarea' },
        { name: 'source', type: 'text' },
        {
          name: 'whitepaperDownloaded',
          type: 'relationship',
          relationTo: 'whitepapers',
        },
      ],
    },
  ],
  globals: [
    {
      slug: 'site-settings',
      fields: [
        { name: 'siteTitle', type: 'text', defaultValue: 'Quantum Atlas' },
        { name: 'tagline', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'calendarLink', type: 'text' },
        { name: 'socialLinkedIn', type: 'text' },
        { name: 'socialTwitter', type: 'text' },
        { name: 'socialYoutube', type: 'text' },
      ],
    },
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  upload: {
    limits: {
      fileSize: 5000000,
    },
  },
})
