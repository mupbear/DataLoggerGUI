QUERY_SELECT_FILTERED_RAW_DATA = """SELECT * FROM raw_data WHERE ID > %s AND CarName = %s AND Time >= %s AND Time <= %s AND Base_ID in %s ORDER BY ID DESC;"""
                                 