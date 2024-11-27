/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import './App.scss';
import cN from 'classnames';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

const products = productsFromServer.map(product => {
  const categoryDetails = categoriesFromServer.find(
    category => category.id === product.categoryId,
  );
  const ownerDetails = usersFromServer.find(
    user => user.id === categoryDetails.ownerId,
  );

  return { ...product, category: categoryDetails, owner: ownerDetails };
});

export const App = () => {
  const [isActiveUser, setIsActiveUser] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');
  let visibleProducts = isActiveUser
    ? products.filter(product => product.owner.id === isActiveUser)
    : products;

  if (searchValue.length > 0) {
    visibleProducts = visibleProducts.filter(product =>
      product.name.toLowerCase().includes(searchValue.toLowerCase()),);
  }

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                onClick={() => {
                  setIsActiveUser(null);
                }}
                className={cN({
                  'is-active': !isActiveUser,
                })}
                data-cy="FilterAllUsers"
                href="#/"
              >
                All
              </a>
              {usersFromServer.map(user => {
                return (
                  <a
                    className={cN({
                      'is-active': user.id === isActiveUser,
                    })}
                    key={user.id}
                    onClick={() => {
                      if (user.id !== isActiveUser) {
                        setIsActiveUser(user.id);
                      }
                    }}
                    data-cy="FilterUser"
                    href="#/"
                  >
                    {user.name}
                  </a>
                );
              })}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  onChange={e => {
                    setSearchValue(e.target.value);
                  }}
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchValue}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                <span className="icon is-right">
                  {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                  {searchValue.length > 0 && (
                    <button
                      onClick={() => {
                        setSearchValue('');
                      }}
                      data-cy="ClearButton"
                      type="button"
                      className="delete"
                    />
                  )}
                </span>
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                onClick={() => {
                  setIsActiveUser(null);
                  setSearchValue('');
                }}
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          {visibleProducts.length === 0 ? (
            <p data-cy="NoMatchingMessage">
              No products matching selected criteria
            </p>
          ) : (
            <table
              data-cy="ProductTable"
              className="table is-striped is-narrow is-fullwidth"
            >
              <thead>
                <tr>
                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      ID
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Product
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-down" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      Category
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort-up" />
                        </span>
                      </a>
                    </span>
                  </th>

                  <th>
                    <span className="is-flex is-flex-wrap-nowrap">
                      User
                      <a href="#/">
                        <span className="icon">
                          <i data-cy="SortIcon" className="fas fa-sort" />
                        </span>
                      </a>
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {visibleProducts.map(product => {
                  return (
                    <tr key={product.id} data-cy="Product">
                      <td className="has-text-weight-bold" data-cy="ProductId">
                        {product.id}
                      </td>
                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="ProductCategory">{`${product.category.icon} - ${product.category.title}`}</td>
                      <td
                        data-cy="ProductUser"
                        className={cN({
                          'has-text-link': product.owner.sex === 'm',
                          'has-text-danger': product.owner.sex === 'f',
                        })}
                      >
                        {product.owner.name}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
