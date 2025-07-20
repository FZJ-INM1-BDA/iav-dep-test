import re
import struct
import math

# not currently in use

class DecodeSxplrUrlException(Exception): pass


cipher = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_-'
separator = '.'
neg = '~'
def encode_number(n, float_flag=False):
    if float_flag:
        b=struct.pack('f', n)
        new_n=struct.unpack('i',b)
        return encode_int(new_n[0])
    else:
        return encode_int(n)

def encode_int(n):
    if not isinstance(n, int):
        raise ValueError('Cannot encode int')

    residual=None
    result=''
    if n < 0:
        result += neg
        residual = n * -1
    else:
        residual = n
    
    while True:
        result = cipher[residual % 64] + result
        residual = math.floor(residual / 64)

        if residual == 0:
            break
    return result

def decode_int(n):
    neg_flag = False
    if n[-1] == neg:
        neg_flag = True
        n = n[:-1]

    result = 0
    for char in n:
        val = cipher.index(char)
        result = result * 64 + val

    if neg_flag:
        result = result * -1
    return result

def decode_number(n, float_flag=False):
    if float_flag:
        raise NotImplementedError
    return decode_int(n)


def decode_url(url: str):
    try:
        space_match = re.search(r'/t:(?P<space_id>[^/]+)', url)
        space_id = space_match.group("space_id")
        space_id = space_id.replace(":", "/")
    except Exception as e:
        raise DecodeSxplrUrlException(f"Cannot decode space_id: {str(e)}") from e
    
    try:
        parc_match = re.search(r'/p:(?P<parc_id>[^/]+)', url)
        parc_id = parc_match.group("parc_id")
        parc_id = parc_id.replace(":", "/")
    except Exception as e:
        raise DecodeSxplrUrlException(f"Cannot decode parc_id: {str(e)}") from e

    nav_match = re.search(r'/@:(?P<navigation_str>.+)/?', url)
    navigation_str = nav_match.group("navigation_str")
    for char in navigation_str:
        assert char in cipher or char in [neg, separator], f"char {char} not in cipher, nor separator/neg"
    
    try:
        ori_enc, pers_ori_enc, pers_zoom_enc, pos_enc, zoomm_enc = navigation_str.split(f"{separator}{separator}")
    except Exception as e:
        raise DecodeSxplrUrlException from e
    
    try:
        x_enc, y_enc, z_enc = pos_enc.split(separator)
        pos = [decode_number(val) for val in [x_enc, y_enc, z_enc]]
        zoom = decode_number(zoomm_enc)

    except Exception as e:
        raise DecodeSxplrUrlException from e
    
    return space_id, parc_id, pos, zoom