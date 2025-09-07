export async function GET(request) {
  try {
    const graphqlQuery = {
      query: `
        query GetTopNFTCollections {
          current_collections_aggregate(
            order_by: { volume_24hr: desc }
            limit: 10
            where: { volume_24hr: { _gt: "0" } }
          ) {
            data {
              collection_id
              collection_name
              creator_address
              logo_url
              volume_24hr
              floor_price_24hr
              total_minted_count
            }
          }
        }
      `
    };

    const response = await fetch(
      'https://api.mainnet.aptoslabs.com/nft-aggregator/v1/graphql',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(graphqlQuery),
        next: { revalidate: 60 } // Cache for 1 minute
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const rawData = await response.json();

    // Validate the response structure
    if (!rawData?.data?.current_collections_aggregate?.data) {
      return new Response(
        JSON.stringify({ error: 'Invalid data structure from API' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Transform data to match existing frontend expectations
    // Using explicit property mapping to avoid any string evaluation
    const collections = rawData.data.current_collections_aggregate.data.map(collection => ({
      id: collection.collection_id || '',
      name: collection.collection_name || '',
      creator: collection.creator_address || '',
      logo_url: collection.logo_url || '',
      // Convert string numbers to floats with fallback to 0
      volume_24h: parseFloat(collection.volume_24hr || '0'),
      floor_price: parseFloat(collection.floor_price_24hr || '0'),
      supply: parseInt(collection.total_minted_count || '0', 10)
    }));

    // Sort by 24h volume (descending) without eval
    collections.sort((a, b) => b.volume_24h - a.volume_24h);

    return new Response(
      JSON.stringify(collections),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60, s-maxage=60',
          // Add security headers
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY'
        }
      }
    );

  } catch (error) {
    console.error('NFT collections fetch error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch collections',
        // Only include error details in development
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
