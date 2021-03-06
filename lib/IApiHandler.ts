import * as RDF from "rdf";
/**
 * Handles an API response.
 */
export interface IApiHandler {
    /**
     * Called by the ApiClient when a fetch response is retrieved.
     * @param {Response} response A response that contains the headers and raw body stream.
     *                            This body should not be used when RDF triples are needed,
     *                            as the ApiClient will parse this body itself using its internal RDF parser,
     *                            and it will invoke {@link #onQuad} for each parsed triple.
     */
    onFetch(response: Response);

    /**
     * Called for each quad that is found in the body.
     * @param {RDF.Quad} quad An RDF quad.
     */
    onQuad(quad: RDF.Quad);

    /**
    * Called for each quad that is found in the body to check its predicate
     * @param {RDF.Quad} quad an RDF quad.
     * @param {any} dataCallback, called to return a match
    * */
    checkPredicates(quad: RDF.Quad, dataCallback: (data) => void);



    /**
     * Called when the body is finished, and no new quads will follow.
     * This is the time to emit any remaining callbacks.
     */
    onEnd();
}