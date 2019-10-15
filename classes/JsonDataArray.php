<?php

class JsonDataArray
{
    private $file;
    private $dataTitle;
    private $dataArray;
    private $query;

    const GUID_PREFIX = 'o';

    const SORT_DIRECTION_FORWARD = true;
    const SORT_DIRECTION_BACKWORD = false;

    const GET_WITH_GUID = true;
    const GET_WITHOUT_GUID = false;

    const PARAM_TYPE_NULL = 0;
    const PARAM_TYPE_NUMERIC = 1;
    const PARAM_TYPE_STRING = 2;
    const PARAM_TYPE_UNSORTED = 3;

    /**
     * Конструктор формирует имя файла без пути и расширения
     * из параметра, в него переданного, создает объект класса
     * JsonFileAccessModel, который загружает из него содержимое в строковом виде
     * а затем преобразует в json-объекты
     * @param string $dataModelName имя файла без пути и расширения
     */
    public function __construct($dataModelName = null)
    {
        //Создание имени файла из имени класса
        $dataModelName =  $dataModelName ?? strtolower(static::class);
        $this->file = new JsonFileAccessModel($dataModelName);
        $this->load();
    }

    /*
    * Загрузка содержимого json-файла
    * в два приватных свойства:
    * dataTitle - содержит номер последнего созданной записи
    * dataArray - содержит все записи
    * и создание функцией newQuery() массива ключей из массива dataArray
    */
    public function load()
    {
        $this->dataTitle = $this->file->readJson()->dataTitle;
        $this->dataArray = (array)$this->file->readJson()->dataArray;
        $this->newQuery();
    }

    /**
     * Сохранение данных обратно в json-файл
     */
    public function save()
    {
        $this->file->writeJson([
            'dataTitle' => $this->dataTitle,
            'dataArray' => $this->dataArray,
        ]);
    }

    /**
     * Создание в свойстве $query индексного массива
     * ключей из массива записей $this->dataArray
     * возвращает текущий объект
     * @return array
     */
    public function newQuery()
    {
        $this->query = array_keys($this->dataArray);
        return $this;
    }

    /**
     * Возвращает список ключей массива, загруженного из json-файла
     */
    public function getGuids()
    {
        return $this->query;
    }

    /**
     * создание индексного массива $result и поиск объектов по их guid в масиве $dataArray загруженном из json-файла
     * запись найденного объекта массива dataArray в массив $result
     * Вид массива определяется переменной $withGuid (ключевой - $withGuid = true, индексный $withGuid = false)
     * @param  [type] $withGuid [description]
     * @return [type]           [description]
     */
    public function getObjs($withGuid = self::GET_WITHOUT_GUID)
    {
        $result = [];
        if ($withGuid) {
            foreach ($this->query as $guid) {
                $result[$guid] = $this->dataArray[$guid];
            }
        } else {
            $counter = 0;
            foreach ($this->query as $guid) {
                $result[$counter++] = $this->dataArray[$guid];
            }
        }
        return $result;
    }

    /**
     * Поиск в массиве по ключу и его значению
     * @param  string  $param    название ключа в объекте записи
     * @param  string  $value    значение ключа в объекте записи
     * @param  boolean $findLike поиск похожих значений
     * @return object  $this     возвращает текущий объект, очищенный от несовпадающих значений
     */
    public function find($param, $value, $findLike = false)
    {
        foreach ($this->query as $index => $guid) {
            if ($findLike) {
                if (!preg_match('/' . $value . '/i', $this->dataArray[$guid]->$param)) {
                    unset($this->query[$index]);
                }
            } else {
                if ($this->dataArray[$guid]->$param !== $value) {
                    unset($this->query[$index]);
                };
            }
        }
        array_values($this->query);
        return $this;
    }

    /**
     * Добавление нового объекта в массив записей dataArray
     * возвращение ID этого объекта
     * @param object $obj новая запись в dataArray
     */
    public function add($obj)
    {
        $guid = self::GUID_PREFIX . ++$this->dataTitle->last_guid;
        $this->dataArray[$guid] = $obj;
        $this->query = [$guid];
        return $guid;
    }

    /**
     * Вероятно изменение параметра объекта в массиве
     * (похоже что функция написана с ошибкой)
     * @param  string $param     название ключа в объекте записи
     * @param  string $new_value новое значение
     */
    public function changeParam($param, $new_value)
    {
        foreach ($this->query as $obj) {
            $obj->$param = $new_value;
        }
    }

    /**
     * Изменение записи в массиве DataArray по ее ID-ключу
     * @param  string $guid порядковый номер записи (ID)
     * @param  object $obj  обновленный объект, который заменит старую запись
     */
    public function changeObjByGuid($guid, $obj)
    {
        if (!is_null($this->dataArray[$guid])) {
            foreach ($obj as $param => $value) {
                $this->dataArray[$guid]->$param = $value;
            }
        } else {
            throw new Error('object not exist');
        }
        $this->dataArray[$guid] = $obj;
    }

    public function delete()
    {
        foreach ($this->query as $guid) {
            unset($this->dataArray[$guid]);
        };
        $this->query = [];
        return true;
    }

    public function first()
    {
        foreach ($this->query as $guid) {
            return $this->query = [$guid];
        }
        return $this;
    }

    public function last()
    {
        $this->query = [end($this->query)];
        return $this;
    }

    /**
     * Поиск нужного ключа в списке извлеченных ключей
     * Извлечение из списка ключей массива ключа с искомым названием
     * @param  array  $guid - ID записи
     * @return object $this - возвращает текущий объект
     */
    public function byGuid($guid)
    {
        if (in_array($guid, $this->query)) {
            $this->query = [$guid];
        } else {
            $this->query = [];
        }
        return $this;
    }

    public function byGuids($guids = [])
    {
        $result = [];
        foreach ($guids as $guid) {
            foreach ($this->query as $query_guid) {
                // Верно ли написано условие? $query_guid = $guid или $query_guid = $guid
                if ($query_guid = $guid && in_array($guid, $result)) {
                    $result[] = $guid;
                }
            }
        }
        $this->query = $result;
        return $this;
    }

    public function count()
    {
        return count($this->query);
    }


    private function numericSort($arr, $param)
    {
        $count = count($arr);
        if ($count <= 1) {
            return $arr;
        }

        $this_guid = $arr[0];
        $this_param_val = $this->dataArray[$this_guid]->$param;
        $left_arr = [];
        $right_arr = [];

        for ($i = 1; $i < $count; $i++) {
            if (
                (($this_param_val === null) ||
                    ($this->dataArray[$arr[$i]]->$param === null)
                ) xor
                ($this->dataArray[$arr[$i]]->$param <= $this_param_val)
            ) {
                $left_arr[] = $arr[$i];
            } else {
                $right_arr[] = $arr[$i];
            }
        }

        $left_arr = $this->numericSort($left_arr, $param);
        $right_arr = $this->numericSort($right_arr, $param);

        return array_merge($left_arr, [$this_guid], $right_arr);
    }

    private function stringSort($arr, $param)
    {
        $count = count($arr);
        if ($count <= 1) {
            return $arr;
        }

        $this_guid = $arr[0];
        $this_param_val = $this->dataArray[$this_guid]->$param;
        $left_arr = [];
        $right_arr = [];

        for ($i = 1; $i < $count; $i++) {
            if (
                (
                    ($this_param_val === null) ||
                    ($this->dataArray[$arr[$i]]->$param === null
                    )
                ) xor
                strcasecmp($this->dataArray[$arr[$i]]->$param, $this_param_val) > 0
            ) {
                $right_arr[] = $arr[$i];
            } else {
                $left_arr[] = $arr[$i];
            }
        }

        $left_arr = $this->stringSort($left_arr, $param);
        $right_arr = $this->stringSort($right_arr, $param);

        return array_merge($left_arr, [$this_guid], $right_arr);
    }

    private function identifyParamType($param, $iteration = 0, $max = null)
    {
        $paramExample = $this->dataArray[$this->query[$iteration]]->$param;
        if (is_null($max)) {
            $max = $this->count();
        }
        if (is_null($paramExample)) {
            if (($iteration + 1) < $max) {
                return $this->identifyParamType($param, $iteration + 1, $max);
            } else {
                return self::PARAM_TYPE_NULL;
            }
        }
        if (is_numeric($paramExample)) {
            return self::PARAM_TYPE_NUMERIC;
        }
        if (is_string($paramExample)) {
            return self::PARAM_TYPE_STRING;
        }
        return self::PARAM_TYPE_UNSORTED;
    }

    public function orderBy($param, $direction_forward = self::SORT_DIRECTION_FORWARD)
    {
        $param_type = $this->identifyParamType($param);
        if ($param_type === self::PARAM_TYPE_NUMERIC || $param_type === self::PARAM_TYPE_STRING) {
            if ($param_type === self::PARAM_TYPE_NUMERIC) {
                $this->query = $this->numericSort($this->query, $param);
            };
            if ($param_type === self::PARAM_TYPE_STRING) {
                $this->query = $this->stringSort($this->query, $param);
            };
            if (!$direction_forward) {
                $this->query = array_reverse($this->query);
            }
        } else {
            throw new Error('not ordered field');
        }
        return $this;
    }

    public function limit($limit)
    {
        $this->query = array_slice($this->query, 0, $limit);
        return $this;
    }
}
