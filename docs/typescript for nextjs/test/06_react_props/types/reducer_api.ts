type ApiState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

type ApiAction<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: string };

function apiReducer<T>(state: ApiState<T>, action: ApiAction<T>): ApiState<T>{
    switch(action.type){
        case "FETCH_START":
            return {
                data: null,
                loading: true,
                error: null
            }
        case "FETCH_SUCCESS":
            return {
                data: action.payload,
                loading: false,
                error: null
            }
        case "FETCH_ERROR":
            return {
                data: null,
                loading: false,
                error: action.payload
            }
    }
}