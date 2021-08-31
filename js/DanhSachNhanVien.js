function DanhSachNhanVien() {
    this.mang = [];
    
    this.themNV = function(sv) {
        this.mang.push(sv);
    }

    this.timViTri = function(tk) {
        var viTri = -1;
        this.mang.map(function(nv,index) {
            if(nv.taiKhoan == tk) {
                viTri = index
            }
        })
        return viTri;
    }

    this.xoaNV = function(tk) {
       var viTri = this.timViTri(tk);
       if(viTri >= 0) {
           this.mang.splice(viTri,1)
       }
    }

    this.capNhatNV = function(nv) {
        var viTri = this.timViTri(nv.taiKhoan);
        if(viTri >= 0) {
           this.mang[viTri] = nv;
        }
    }

}

DanhSachNhanVien.prototype.timKiem = function(tk) {
    var mangKQ = [];
    var chuThuong = tk.trim().toLowerCase();
    var chuKoDau = chuThuong.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    this.mang.map(function(nv) {
        var lower = nv.xepLoai.trim().toLowerCase();
        var lowerTokodau = lower.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        var ketQua = lowerTokodau.indexOf(chuKoDau);
        if(ketQua >= 0) {
            mangKQ.push(nv)
        }
    })
    return mangKQ;
}