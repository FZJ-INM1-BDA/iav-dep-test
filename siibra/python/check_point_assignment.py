import siibra

def main():
    m = siibra.get_map('3.1', 'icbm 152', 'statistical')
    pt = siibra.Point([-57, -58, 32], space="icbm 152", sigma_mm=0)
    asgmt = m.assign(pt)
    print(asgmt[["region", "map value"]])

if __name__ == "__main__":
    main()
