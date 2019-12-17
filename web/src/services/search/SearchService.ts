import { SearchParams, SearchResponse } from "../../stores/actions/searchActions"

class SearchService {
    public static async search(searchParams: SearchParams): Promise<SearchResponse[]> {
        return []
    }
}

export default SearchService
