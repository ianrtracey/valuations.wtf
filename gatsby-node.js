/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require('node-fetch')
const crypto = require('crypto')

const getContentHash = (companyNode) => (
        crypto
            .createHash(`md5`)
            .update(JSON.stringify(companyNode))
            .digest(`hex`)
)

const addFields = (createNodeField, node, fields) => {
    fields.map(({name, value}) => {
        createNodeField({
            node,
            name,
            value,
        })
    })
} 

 exports.sourceNodes = async ({ actions }) => {
     const { createNode, createNodeField } = actions
     const resp = await fetch('https://api.airtable.com/v0/appa57nGmrCFuVehC/Table%201', {
         headers: {
             'Authorization': `Bearer ${process.env.AIRTABLE_KEY}`
         }
     })
     const data = await resp.json();
     data.records.map((entry) => {
        const companyNode = {
            id: `${entry.id}`,
            parent: `__SOURCE__`,
            internal: {
                type: 'Company', // name of GraphQL query
            },
            children: [],
        }
        companyNode.internal.contentDigest = getContentHash(companyNode);
        createNode(companyNode)
        console.log(entry)
        addFields(
            createNodeField,
            companyNode,
            [
                { 
                    name: 'name',
                    value: entry.fields.Name
                },
                {
                    name: 'valuation',
                    value: entry.fields.Valuation
                },
                {
                    name: 'logoUrl',
                    value: entry.fields.Logo
                },
                  {
                    name: 'country',
                    value: entry.fields.Country
                }
            ]
        )
     })
 }