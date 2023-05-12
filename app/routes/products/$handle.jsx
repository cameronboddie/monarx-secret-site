import {useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

export async function loader({params, context}) {
  const {handle} = params;

  return context.storefront.query(PRODUCT_QUERY, {variables: {handle}});
}

export default function Product() {
  const {product} = useLoaderData();
  console.log(product);
  return (
    <div>
      <div className="product-wrapper">
        <h2>Product Title: {product.title}</h2>
        <div
          className="prose border-t border-gray-200 pt-6 text-black text-md"
          dangerouslySetInnerHTML={{__html: product.descriptionHtml}}
        ></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {product.images.nodes.map((imgData) => (
          <Image
            data={imgData}
            key={imgData.id}
            sizes="(max-width: 32em) 100vw, 33vw"
            widths={[400, 500, 600, 700, 800, 900]}
            loaderOptions={{
              scale: 2,
              crop: 'center',
            }}
            className="rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
query product($handle: String!) {
  product(handle: $handle) {
    title
    descriptionHtml
    images(first: 10) {
      nodes {
        id
        url
        height
        width
      }
    }
    options {
      name
      values
    }
  }
}
`;
