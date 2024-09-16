import MovieLookup from "components/MovieLookup";
import { ReactQueryDevtools } from "react-query/devtools";

const App = () => (
  <>
    <div className="flex h-screen">
      <div className="h-full w-2/3 p-4">
        <MovieLookup />
      </div>
      <div className="flex items-center justify-center">
        <div className="divider neeto-ui-bg-gray-300 w-px" />
      </div>
      <div className="w-1/3 p-4">
        <p>history component</p>
      </div>
    </div>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    {/* <Switch>
      <Route exact component={Product} path={routes.products.show} />
      <Route exact component={ProductList} path={routes.products.index} />
      <Route exact component={Cart} path={routes.cart} />
      <Route exact component={Checkout} path={routes.checkout} />
      <Redirect
        exact
        from={routes.root}
        to={buildUrl(routes.products.index, {
          page: DEFAULT_PAGE_INDEX,
          page_size: DEFAULT_PAGE_SIZE,
        })}
      />
      <Route component={PageNotFound} path="*" />
    </Switch>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" /> */}
  </>
);

export default App;
