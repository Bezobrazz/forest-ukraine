import Loader from "../Loader/Loader.jsx";
import styles from "./Table.module.css";

const Table = ({
  isLoader = false,
  columns,
  data,
  rowKey = "id",
  // sortBy = "createdAt",
  getRowClassName = () => "",
}) => {
  // const sortedData = [...data].sort((a, b) => {
  //   if (a[sortBy] > b[sortBy]) return -1;
  //   if (a[sortBy] < b[sortBy]) return 1;
  //   return 0;
  // });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.header}>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={styles.headerCell}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoader ? (
            <tr>
              <td colSpan={columns.length} className={styles.loaderCell}>
                <Loader />
              </td>
            </tr>
          ) : (
            data.map((row) => {
              const rowClass = getRowClassName(row);
              return (
                <tr key={row[rowKey]} className={`${styles.row} ${rowClass}`}>
                  {columns.map((column) => (
                    <td key={column.key} className={styles.cell}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
