function NhanVien(taiKhoan , hoTen , email , mk , date ,luong,chucvu ,time) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.mk = mk;
    this.date = date;
    this.luong = luong;
    this.chucVu = chucvu;
    this.time = time;
    this.tongLuong = 0;
    this.xepLoai = "";

    this.tinhLuong = function() {
        if(this.chucVu == "Sếp") {
            return (this.luong*3).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        } else if(this.chucVu == "Trưởng phòng") {
           return (this.luong*2).toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        } else if(this.chucVu == "Nhân viên") {
            return this.luong.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
        } else{
            return "vui Lòng chọn vào ô thích hợp"
        }
    }

    this.tinhXepLoai = function() {
        if(this.time > 0 && this.time < 160) {
            return "Trung bình"
        } else if(this.time >= 160 && this.time < 176) {
            return "Khá"
        } else if(this.time >= 176 && this.time < 192) {
            return "Giỏi"
        } else if(this.time >= 192) {
            return "Xuất sắc"
        } else {
            return "Vui Lòng chọn số giờ"
        }
    }

}