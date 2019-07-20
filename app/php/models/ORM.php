<?php
/**
 * Created by PhpStorm.
 * User: Fivaz
 * Date: 18/02/2019
 * Time: 16:56
 */

class ORM
{
    protected $db;
    protected $table;
    protected $view;
    protected $attributes = [];
    protected $primary_keys = [];

    public function __construct()
    {
        $this->db = new DBConnection();
        $results = $this->db->query("DESCRIBE {$this->table}");

        $columns = $results->fetchAll(PDO::FETCH_ASSOC);

        foreach ($columns as $column) {
            $this->setAttr($column["Field"], null);
            if ($column["Key"] == "PRI")
                $this->setPK($column["Field"]);
        }
    }

    public function getAttr($key)
    {
        return $this->attributes[$key];
    }

    public function setAttr($key, $value)
    {
        $this->attributes[$key] = $value;
    }

    public function getAttrs()
    {
        return $this->attributes;
    }

    public function setAttrs($attributes)
    {
        $this->attributes = $attributes;
    }

    public function getPK($position = 0)
    {
        return $this->primary_keys[$position];
    }

    public function setPK($primary_key)
    {
        array_push($this->primary_keys, $primary_key);
    }

    public function getPKs()
    {
        return $this->primary_keys;
    }

    public function setPKs($primary_keys)
    {
        $this->primary_keys = $primary_keys;
    }

    private function getView()
    {
        if ($this->view)
            return $this->view;
        else
            return $this->table;
    }

    public function fromJSON($json)
    {
        $assoc_array = json_decode($json, true);
        //if the element already exist in the database, get all attributes from the database
        if (isset($assoc_array["_id"]))
            $this->get($assoc_array["_id"], true);
        //then iterate the json and replace just the existing attributes in the json
        foreach ($this->attributes as $key => $value)
            if (isset($assoc_array["_" . $key]))
                $this->setAttr($key, $assoc_array["_" . $key]);
    }

    public function toJSON()
    {
        return json_encode($this->getAttrs());
    }

    //CRUD
    //CREATE
    public function create()
    {
        $columns = SQLHelper::buildInsertColumns($this->getAttrs());
        $values = SQLHelper::buildInsertValues($this->getAttrs());
        $statement = $this->db->prepare("INSERT INTO {$this->table} {$columns} VALUES {$values}");
        $data = ArrayHelper::buildInsertData($this->getAttrs());
        $result = $statement->execute($data);

        if ($result) {
            $id = $this->db->lastInsertId();
            $this->get($id);
            return null;
        } else
            return $statement->errorInfo()[2];
    }

    //READ
    public function get($id, $forceTable = false)
    {
        if ($forceTable)
            $schemaObject = $this->table;
        else
            $schemaObject = $this->getView();

        $statement = $this->db->prepare("SELECT * FROM {$schemaObject} WHERE {$this->getPK()} = ?");
        $statement->execute([$id]);

        $row = $statement->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            $this->setAttrs($row);
            return $this;
        } else
            return null;
    }

    public function getAll($column = null, $value = null)
    {
        $query = "SELECT * FROM {$this->getView()}";
        if ($column)
            $query .= " WHERE {$column} = ?";

        $statement = $this->db->prepare($query);
        $statement->execute([$value]);

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    //UPDATE
    public function save()
    {
        $columnsAndValues = SQLHelper::buildUpdate($this->getAttrs());
        $statement = $this->db->prepare("UPDATE {$this->table} SET {$columnsAndValues} WHERE {$this->getPK()} = ?");
        $data = ArrayHelper::buildUpdateData($this->getAttrs(), $this->getPKs());
        $result = $statement->execute($data);

        if ($result)
            return null;
        else
            return $statement->errorInfo()[2];
    }

    //DELETE
    public function delete()
    {
        $columnsAndValues = SQLHelper::buildDelete($this->getPKs());
        $data = ArrayHelper::buildDeleteData($this->getAttrs(), $this->getPKs());
        $statement = $this->db->prepare("DELETE FROM " . $this->table . " WHERE " . $columnsAndValues);
        $result = $statement->execute($data);

        if ($result)
            return null;
        else
            return $statement->errorInfo()[2];
    }

    public function softDelete()
    {
        $this->setAttr("isArchived", 1);
        return $this->save();
    }
}