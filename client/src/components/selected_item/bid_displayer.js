import { useState, useEffect } from 'react';
import { getItems } from '../../utils/fetchUtils';

const BidDisplayer = ({ bikeId }) => {
  const [bids, setBids] = useState([]);
  const [users, setUsers] = useState({});

  useEffect(() => {
    const fetchBidsAndUsers = async () => {
      try {
        const bidsData = await getItems('bike', bikeId, 'bids');
        setBids(bidsData);

        const usersData = await Promise.all(bidsData.map(bid => getItems('user', bid.email, '')));
        const usersMap = usersData.reduce((acc, user, index) => {
          acc[bidsData[index].email] = user;
          return acc;
        }, {});
        setUsers(usersMap);
      } catch (error) {
        console.error('Error fetching bids and users:', error);
      }
    };

    fetchBidsAndUsers();
  }, [bikeId]);

  const sortByAmountDescending = (a, b) => b.amount - a.amount;

  const topBids = bids.sort(sortByAmountDescending).slice(0, 10);

  return (
    <form>
      <h1>List Of Bids: </h1>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {topBids.map((bid, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div style={{ fontWeight: 'bold' }}>Name: {users[bid.email]?.name}</div>
            <div>Amount: {bid.amount}€</div>
          </div>
        ))}
      </div>
    </form>
  );
}

export default BidDisplayer;
