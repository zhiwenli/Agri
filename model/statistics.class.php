
<?php
class Statistics{
  
  //获取不同类型的entity个数
  public function getDifferentTypesNum(){

    $typeArr = array(YBJP, ZY, NC, JD, YXWD, AX, DW, GR, VSAT);
    $typeNumArr = array();

    $entityOprt = new EntityOprt();

    $i = 0;
    foreach ($typeArr as $key => $value) {
      $entityArr = $entityOprt->getEntityAttrArr($value);
      $typeNumArr[$typeArr[$i++]] = count($entityArr);
    }
    
    return $typeNumArr;
  }
}