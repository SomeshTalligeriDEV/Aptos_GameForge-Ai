export const dynamic = 'force-dynamic'
export const runtime = 'edge'

export default function routeSegmentConfig() {
  return {
    loading: 'lazy',
    revalidate: 3600, // Revalidate every hour
  }
}
