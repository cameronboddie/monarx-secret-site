import {Link, useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export const meta = () => {
  return {
    title: 'Hydrogen',
    description: 'A custom storefront powered by Hydrogen',
  };
};

export async function loader({context}) {
  return await context.storefront.query(PRODUCTS_QUERY);
}

export default function Index() {
  const {products} = useLoaderData();

  return (
    <section className="w-full gap-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Products
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  sm:grid-cols-3 false false">
        {products.nodes.map((p) => {
          return (
            <Link to={`/products/${p.handle}`} key={p.id}>
              <div className={'grid gap-4'}>
                {p.featuredImage && (
                  <Image
                    alt={`Image of ${p.title}`}
                    data={p.featuredImage}
                    key={p.id}
                    sizes="(max-width: 32em) 100vw, 33vw"
                    widths={[400, 500, 600, 700, 800, 900]}
                    loaderOptions={{
                      scale: 2,
                      crop: 'center',
                    }}
                  />
                )}
                <h2
                  className={
                    'whitespace-pre-wrap max-w-prose font-medium text-copy'
                  }
                >
                  {p.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const PRODUCTS_QUERY = `#graphql
query SecretProducts {
  products(first: 100, query:"tag:secret") {
    nodes {
      id
      title
      handle
      featuredImage {
        id
        url
        height
        width
      }
    }
  }
}
`;
