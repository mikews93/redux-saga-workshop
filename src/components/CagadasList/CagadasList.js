import React from 'react';
import Spinner from 'emerald-ui/lib/Spinner';
import Table from 'emerald-ui/lib/Table';
import TableRow from 'emerald-ui/lib/TableRow';
import Pager from 'emerald-ui/lib/Pager';
import styled from 'styled-components';
import TableHeader from 'emerald-ui/lib/TableHeader';
import TableHeaderCell from 'emerald-ui/lib/TableHeaderCell';
import { REQUEST_STATUSES } from '../../constants';

export const StyledTableRow = styled(TableRow)`
  cursor: pointer;

  && td {
    vertical-align: middle;
  }

  && td .select-wrapper {
    margin-top: 0;
  }

  .dropdown-menu {
    top: -6px;
  }
`;

export const Layout = styled.div`
  margin-top: 10px;
`;
class CagadasList extends React.Component {
  componentDidMount() {
    const { fetchCagadas, cagadaFetchStatus } = this.props;
    if (
      cagadaFetchStatus === REQUEST_STATUSES.NOT_LOADED ||
      cagadaFetchStatus === REQUEST_STATUSES.FAILED
    ) {
      fetchCagadas();
    }
  }

  render() {
    const { cagadas, cagadaFetchStatus } = this.props;
    const showSpinner =
      cagadaFetchStatus === REQUEST_STATUSES.NOT_LOADED ||
      cagadaFetchStatus === REQUEST_STATUSES.FAILED;
    let size = 1;
    let params = { limit: 10, offset: 0 };
    const showDataNotFound = size > 0 ? false : true;
    return (
      <Layout>
        <Table condensed>
          <TableHeader>
            <TableHeaderCell sortKey="author">Author</TableHeaderCell>
            <th>Date</th>
            <th>Description</th>
            <th>Meme</th>
            <th>Video</th>
            <th>From</th>
            <th>To</th>
            <th>Rank</th>
            <th>Reactions</th>
          </TableHeader>
          <tbody>
            {showSpinner ? (
              <tr className="text-center">
                <td colSpan="4">
                  <Spinner size="lg" />
                </td>
              </tr>
            ) : (
              cagadas.map((cagada, index) => (
                <StyledTableRow key={index}>
                  <td>
                    <p>{cagada.author}</p>
                  </td>
                  <td>
                    <p>{cagada.date}</p>
                  </td>
                  <td>
                    <p>{cagada.desciption}</p>
                  </td>
                  <td>
                    <p>{cagada.meme}</p>
                  </td>
                  <td>
                    <p>{cagada.video}</p>
                  </td>
                  <td>
                    <p>{cagada.from}</p>
                  </td>
                  <td>
                    <p>{cagada.to}</p>
                  </td>
                  <td>
                    <p>{cagada.rank}</p>
                  </td>
                  <td>
                    <p>{cagada.reactions}</p>
                  </td>
                </StyledTableRow>
              ))
            )}
            {showDataNotFound && (
              <tr>
                <td colSpan="10">No data found</td>
              </tr>
            )}
          </tbody>
        </Table>
        <Pager
          limit={params.limit}
          limits={[10, 25, 50]}
          offset={params.offset}
          onPageChange={this.handlePageChange}
          onLimitChange={this.handleLimitChange}
          total={size}
        />
      </Layout>
    );
  }
}

export default CagadasList;
