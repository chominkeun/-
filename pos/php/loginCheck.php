<?php
//다른 페이지에서 넘어올 떄 차단 code
/*
if(!isset($_POST['ACCESS'])){
  echo json_encode(array('ACCESS'=>'denied'));
  exit;
}
*/

//db대신 임시 아이디 비번
$get_id = 'capstone';
$get_pw = sha1('1234');


//아이디 비밀번호 입력안했을 경우
if(empty($_POST['id']) || empty($_POST['pw'])) {
  echo json_encode(array('result' => 'fail', 'message' => '아이디 또는 비밀번호를 입력해주세요'));
  exit;
}

// 아이디 불일치
if($get_id != $_POST['id']) {
  echo json_encode(array('result' => 'fail','message' => '아이디가 일치하지 않습니다.'));
  exit;
}

//비밀번호 불일치
if($get_pw != sha1($_POST['pw'])) {
  echo json_encode(array('result' => 'fail','message' => '비밀번호가 일치하지 않습니다.'));
  exit;
}

//로그인 성공
if($get_id == $_POST['id'] && $get_pw == sha1($_POST['pw']) ){
  echo json_encode(array('result' => 'success','message' => ''));
}

?>
