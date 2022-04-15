import { reactive, ref } from 'vue'
import { useQuery, useResult, useMutation } from '@vue/apollo-composable'
import getKitchens from '../graphql/getKitchens.query.gql'

const useKitchens = function () {
    const cities = () => {
        const { result } = useQuery(getKitchens)
        return useResult(result, null, (data) => data.city)

        // return ['Seattle', 'San Francisco', 'Portland']
    }

    return {
        cities
    }
}

export default useKitchens
