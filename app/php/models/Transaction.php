<?php
/**
 * Created by PhpStorm.
 * User: Fivaz
 * Date: 21/04/2019
 * Time: 06:37
 */

class Transaction extends ORM
{
    public function __construct()
    {
        $this->table = "transaction";
        $this->view = "view_transaction";
        parent::__construct();
    }

    public function getAll($column = null, $value = null)
    {
        $statement = $this->db->prepare("SELECT * FROM {$this->view} WHERE 
        (account_destiny_id = ? AND type = 'transfer') OR account_origin_id = ?");
        $statement->execute([$value, $value]);

        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fromJSON($json)
    {
        $assoc_array = json_decode($json, true);
        $this->get($assoc_array["_id"], true);
        $assoc_array["_date"] = substr($assoc_array["_date"], 0, 10);
        foreach ($this->attributes as $key => $value)
            if (isset($assoc_array["_" . $key]))
                $this->setAttr($key, $assoc_array["_" . $key]);
    }
}