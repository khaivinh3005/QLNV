var dsnv = new DanhSachNhanVien();
var val = new Validation();
function getELE(id) {
    return document.getElementById(id);
}

function getClass(classes) {
    return document.querySelector(classes);
}

function setLocalStorage() {
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mang))
}

function getLocalStorage() {
    if (localStorage.getItem("DSNV") !== null) {
        dsnv.mang = JSON.parse(localStorage.getItem("DSNV"));
        hienThiTable(dsnv.mang);
    }
}
getLocalStorage();

function hienThiTable(dsnv) {
    var content = "";
    dsnv.map(function (nv) {
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.date}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td class="d-flex"> <button onclick = "xoaNV('${nv.taiKhoan}')" class="btn btn-danger mx-1">Xoá</button>
                 <button onclick = "xemNV('${nv.taiKhoan}')" class="btn btn-success mx-1">Xem</button></td>
            </tr>
        `
    })
    getELE("tableDanhSach").innerHTML = content;
}

function themNhanVien() {
    var taiKhoan = getELE("tknv").value;
    var name = getELE("name").value;
    var email = getELE("email").value;
    var mk = getELE("password").value;
    var date = getELE("datepicker").value;
    var luong = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;


    var isValue = true;

    //Check tai khoan
    isValue = val.checkEmpty(taiKhoan, "tbTKNV", "Không được để trống") && val.checkTK(taiKhoan, "tbTKNV", "Tai khoan da bi trung", dsnv.mang);

    //Check hoTen
    isValue &= val.checkEmpty(name,"tbTen","Vui lòng không được để trống") && val.checkHoTen(name,"tbTen","Vui lòng nhập thông tin hợp lệ");

    //Check email
    isValue &= val.checkEmpty(email,"tbEmail","Vui lòng không được để trống") && val.checkEmail(email,"tbEmail","Vui lòng nhập đúng định dạng email");

    //Check pass
    isValue &= val.checkEmpty(mk,"tbMatKhau","Vui lòng không được để trống") && val.checkPass(mk,"tbMatKhau","mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");

    //Check Ngay lam
    isValue &= val.checkEmpty(date,"tbNgay","Vui lòng không được để trống") 

    //Check Luong
    isValue &= val.checkEmpty(luong,"tbLuongCB","Vui lòng không được để trống") && val.checkLuong(luong,"tbLuongCB","Lương cơ bản 1 000 000 - 20 000 000");

    //Check ChuVu
    isValue &= val.checkEmpty(chucVu,"tbChucVu","Vui lòng chọn mục thích hợp") && val.checkChucVu(chucVu,"tbChucVu","Vui lòng chọn mục thích hợp");

    //Check ChuVu
    isValue &= val.checkEmpty(gioLam,"tbGiolam","Vui lòng không được để trống") && val.checkTime(gioLam,"tbGiolam","Giờ làm phải từ 80-200 giờ");


    

    if (isValue) {
        var nv = new NhanVien(taiKhoan, name, email, mk, date, parseFloat(luong), chucVu, parseFloat(gioLam));
        nv.tongLuong = nv.tinhLuong();
        nv.xepLoai = nv.tinhXepLoai();
        dsnv.themNV(nv);
        hienThiTable(dsnv.mang);
        setLocalStorage();
        alert("Bạn đã thêm nhân viên thành công");
        document.querySelector("#btnDong").click();
    }
}

function xoaNV(tk) {
    dsnv.xoaNV(tk);
    setLocalStorage();
    hienThiTable(dsnv.mang);
}

function xemNV(tk) {
    var viTri = dsnv.timViTri(tk);
    var nv = dsnv.mang[viTri];
    console.log(nv);

    getELE("tknv").disabled = true;
    getELE("tknv").value = nv.taiKhoan;
    getELE("name").value = nv.hoTen;
    getELE("email").value = nv.email;
    getELE("password").value = nv.mk;
    getELE("datepicker").value = nv.date;
    getELE("luongCB").value = nv.luong;
    getELE("chucvu").value = nv.chucVu;
    getELE("gioLam").value = nv.time;
console.log(getELE("chucvu"))
    document.querySelector(".modal").classList.add("show");
    document.querySelector(".modal").style.display = "block";
    getELE("btnThemNV").disabled = true;
    document.getElementById("btnDong").addEventListener("click", function () {
        document.querySelector(".modal").classList.remove("show");
        document.querySelector(".modal").style.display = "none";
        getELE("btnThemNV").disabled = false;
        getELE("tknv").disabled = false;
        document.querySelector("form").reset();
    })
}


function capNhatNV() {
    var taiKhoan = getELE("tknv").value;
    var name = getELE("name").value;
    var email = getELE("email").value;
    var mk = getELE("password").value;
    var date = getELE("datepicker").value;
    var luong = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    var isValue = true;

    //Check hoTen
    isValue &= val.checkEmpty(name,"tbTen","Vui lòng không được để trống") && val.checkHoTen(name,"tbTen","Vui lòng nhập thông tin hợp lệ");

    //Check email
    isValue &= val.checkEmpty(email,"tbEmail","Vui lòng không được để trống") && val.checkEmail(email,"tbEmail","Vui lòng nhập đúng định dạng email");

    //Check pass
    isValue &= val.checkEmpty(mk,"tbMatKhau","Vui lòng không được để trống") && val.checkPass(mk,"tbMatKhau","mật Khẩu từ 6-10 ký tự (chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt)");

    //Check Ngay lam
    isValue &= val.checkEmpty(date,"tbNgay","Vui lòng không được để trống") 

    //Check Luong
    isValue &= val.checkEmpty(luong,"tbLuongCB","Vui lòng không được để trống") && val.checkLuong(luong,"tbLuongCB","Lương cơ bản 1 000 000 - 20 000 000");

    //Check ChuVu
    isValue &= val.checkEmpty(chucVu,"tbChucVu","Vui lòng chọn mục thích hợp") && val.checkChucVu(chucVu,"tbChucVu","Vui lòng chọn mục thích hợp");

    //Check ChuVu
    isValue &= val.checkEmpty(gioLam,"tbGiolam","Vui lòng không được để trống") && val.checkTime(gioLam,"tbGiolam","Giờ làm phải từ 80-200 giờ");



    if (isValue) {
        var nv = new NhanVien(taiKhoan, name, email, mk, date, parseFloat(luong), chucVu, parseFloat(gioLam));
        nv.tongLuong = nv.tinhLuong();
        nv.xepLoai = nv.tinhXepLoai();
        dsnv.capNhatNV(nv);
        hienThiTable(dsnv.mang);
        setLocalStorage();
        alert("Bạn đã cập nhật thành công");
    }
}

function timKiemNV() {
    var tuKhoa = getELE("searchName").value;
    var mangKQ = dsnv.timKiem(tuKhoa);
    hienThiTable(mangKQ);
}


getELE("btnThemNV").addEventListener("click", themNhanVien);
getELE("btnCapNhat").addEventListener("click", capNhatNV);
getELE("btnDong").addEventListener("click", function () {
    getELE("tbTKNV").style.display = "none";
    getELE("tbTen").style.display = "none";
    getELE("tbEmail").style.display = "none";
    getELE("tbMatKhau").style.display = "none";
    getELE("tbNgay").style.display = "none";
    getELE("tbLuongCB").style.display = "none";
    getELE("tbChucVu").style.display = "none";
    getELE("tbGiolam").style.display = "none";
    
    document.querySelector("form").reset();
})
getELE("btnTimNV").addEventListener("click",timKiemNV);
getELE("searchName").addEventListener("keyup",timKiemNV);
