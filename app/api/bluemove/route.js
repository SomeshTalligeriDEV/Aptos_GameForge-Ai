export async function GET(request) {
  try {
    const graphqlQuery = {
      query: `
        query GetTopCollections {
          current_collections_aggregate(
            order_by: { volume_24hr: desc }
            limit: 50
            where: { volume_24hr: { _gt: "0" } }
          ) {
            data {
              collection_id
              collection_name
              creator_address
              description
              logo_url
              volume_24hr
              floor_price_24hr
              supply
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
      throw new Error(`API request failed with status ${response.status}`);
    }

    let data;
    try {
      data = await response.json();
    } catch (error) {
      console.error('JSON parsing error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch collections' }), 
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Validate the GraphQL response structure
    if (!data?.data?.current_collections_aggregate?.data) {
      console.error('Invalid data structure from aggregator:', data);
      return new Response(
        JSON.stringify({ error: 'Invalid data from aggregator' }),
        { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Transform the data to match the expected format
    const collections = data.data.current_collections_aggregate.data.map(collection => ({
      id: collection.collection_id,
      name: collection.collection_name,
      creator: collection.creator_address,
      description: collection.description,
      logo_url: collection.logo_url,
      volume_24h: collection.volume_24hr,
      floor_price: collection.floor_price_24hr,
      supply: collection.supply
    }));

    return new Response(
      JSON.stringify(collections),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60'
        }
      }
    );

  } catch (error) {
    console.error('NFT Aggregator API error:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch collections' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
