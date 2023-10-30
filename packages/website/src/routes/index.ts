export const BLOG_POST_PARAM = ':slug'

export const getRoutePartialId = (route: string) => route.replace('/#', '')

export const routes = {
  home: '/',
  features: '/#features',
  testimonials: '/#testimonials',
  pricing: '/#pricing',
  faq: '/#faq',
  blog: '/blog',
  blogPost: `/blog/${BLOG_POST_PARAM}`,
  privacy: '/privacy',
}
