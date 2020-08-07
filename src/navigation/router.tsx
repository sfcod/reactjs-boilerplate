import lodash from 'lodash';

class Router {
    public static generate(route: string, params: AnyObject = {}): string {
        const urlSearchParams = new URLSearchParams();

        lodash.forEach(params, (value: any, key: string) => {
            if (route.indexOf(`:${key}`) !== -1) {
                route = route.replace(`:${key}`, value);
            } else {
                urlSearchParams.append(key, value);
            }
        });

        if (urlSearchParams.toString()) {
            route = route + '?' + urlSearchParams.toString();
        }

        return route;
    }
}

export default Router;
