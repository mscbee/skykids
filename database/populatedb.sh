mongo skykidsDatabase --eval "db.dropDatabase()"

mongo use skykidsDatabase

colls=(userDetails userPasswords staffDetails staffStatus orders productCatalogue orderStatus)

for c in ${colls[@]}
do
  mongoimport -d skykidsDatabase -c $c --file $c.json
done
