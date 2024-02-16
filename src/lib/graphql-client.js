/**
 * @property {string} url
 * @property {Object} requestConfig
 */

export class GraphQLClient {
    /**
     * @param {string} url - The URL for the GraphQL endpoint
     * @param {Object} requestConfig - The the request header
     */
    constructor(url, requestConfig) {
        this.url = url
        this.requestConfig = requestConfig
    }

    async request(query) {
        try {
            const response = await fetch(this.url, {
                method: 'POST',
                headers: this.requestConfig,
                body: JSON.stringify(query) 
            })
            if (!response.ok) {
                throw new Error("error fetching data")
            }
            const data = await response.json()
            if (data.errors) {
                if (data.errors[0].extensions.code === 'invalid-jwt') {
                    throw new Error("not authorized")
                }
            }
            return data
        } catch (error) {
            if (error.message === "not authorized") {
                location.href = "index.html"
            }
            console.log(error);
        }

    }
}