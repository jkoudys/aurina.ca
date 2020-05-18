import React from 'react'
import {graphql, useStaticQuery} from 'gatsby'
import get from 'lodash/get'
import {Image, Header} from 'semantic-ui-react'
import ProductList from '../components/ProductList'
import SEO from '../components/SEO'
import logo from '../images/ill-short-dark.svg'
import Layout from '../components/Layout'

const StoreIndex = ({location}) => {
  const data = useStaticQuery(graphql`
    query IndexQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMoltinProduct {
        edges {
          node {
            id
            name
            description
            mainImageHref
            meta {
              display_price {
                with_tax {
                  amount
                  currency
                  formatted
                }
              }
            }
            mainImage {
              childImageSharp {
                sizes(maxWidth: 600) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    }
  `)

  const siteTitle = get(data, 'site.siteMetadata.title')
  const products = get(data, 'allMoltinProduct.edges')
  const filterProductsWithoutImages = products.filter(v => v.node.mainImageHref)
  return (
    <Layout location={location}>
      <SEO title={siteTitle} />
      <h1
        style={{
          fontSize: '5rem',
          fontWeight: 100,
          textAlign: 'center',
          letterSpacing: '1rem',
        }}
      >
        aurina<span style={{color: 'gold'}}>⬡</span>
      </h1>
      <ProductList products={filterProductsWithoutImages} />
    </Layout>
  )
}

export default StoreIndex
